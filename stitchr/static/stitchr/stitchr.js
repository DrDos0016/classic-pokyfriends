image_list = [];
images = [];
arranging = false;
$(document).ready(function ()
{    
    
    
    $("body").click(function (){
        $(".overlay").hide();
        $(".option").removeClass("selected");
        arranging = false;
    });
    
    $("body").keyup(function (e){
        if (! arranging)
            return false;
        
        if (e.which == 37)
        {
            orig_image = $("#order_area .image.selected").find("img").attr("src");
            prev_image = $("#order_area .image.selected").prev().find("img").attr("src");
            
            $("#order_area .image.selected").find("img").attr("src", prev_image);
            $("#order_area .image.selected").prev().find("img").attr("src", orig_image);
            
            $("#order_area .image.selected").removeClass("selected").prev().addClass("selected");
        }
        else if (e.which == 39)
        {
            orig_image = $("#order_area .image.selected").find("img").attr("src");
            next_image = $("#order_area .image.selected").next().find("img").attr("src");
            
            $("#order_area .image.selected").find("img").attr("src", next_image);
            $("#order_area .image.selected").next().find("img").attr("src", orig_image);
            
            $("#order_area .image.selected").removeClass("selected").next().addClass("selected");
        }
        
        new_order = [];
        new_list = [];
        $("#order_area .image img").each(function (){
            new_order.push($(this).get()[0]);
            new_list.push($(this).attr("src"));
        });
        images = new_order;
        image_list = new_list;
        
    });
    
    $("#load_photoset").click(function (){
        var url = $("#url").val();
        if (url)
        {
            // Reset everything
            image_list = [];
            images =  [];
            $("#order_area").html("");
            $("#loaded_images").html("0");
            $("#total_images").html("0");
            
            $.ajax({
                url: "/stitchr/ajax/load_url",
                method: "POST",
                data: {"csrfmiddlewaretoken":$("input[name=csrfmiddlewaretoken]").val(), "url":$("#url").val()},
                dataType: "JSON",
            }).fail(function(data) {
                console.log("ERROR")
                console.log(data);
            }).done(function(data) {
                console.log(data);
                $("#total_images").html(data["images"].length);
                for (var x=0; x < data["images"].length; x++)
                {
                    var img = new Image();
                    img.src = data["images"][x];
                    img.addEventListener("load", function() {
                        $("#loaded_images").html((parseInt($("#loaded_images").text()) + 1));
                        if (parseInt($("#loaded_images").text()) == parseInt($("#total_images").text()))
                        {
                            render_order();
                            render_canvas();
                        }
                    }, false);
                    
                    image_list.push(data["images"][x]);
                    images.push(img);
                }
            });
        }
    });
    
    $(".option").click(function (e){
        var id = $(this).attr("id");
        $(".overlay").hide();
        $(".option").removeClass("selected");
        
        $(this).addClass("selected");
        if (id == "order")
            arranging = true;
        $("#"+id+"_overlay").css("display", "flex");
        
        e.stopPropagation();
    });
    
    $(".menu").click(function (e){
        e.stopPropagation();
    });
    
    $("#bg_input").spectrum({
        flat: true, 
        showInput: true, 
        showPalette: true, 
        palette: [["white", "gainsboro"], ["lightgray", "silver"], ["darkgray", "gray"], ["dimgray", "black"]], 
        preferredFormat: "hex", 
        change: function(color){
            $(".overlay").hide();
            $("#bg_input").val(color);
            render_canvas();
        }
    });
    
    $("#border_color_input").spectrum({
        flat: true, 
        showInput: true, 
        showPalette: true, 
        palette: [["white", "gainsboro"], ["lightgray", "silver"], ["darkgray", "gray"], ["dimgray", "black"]], 
        preferredFormat: "hex", 
        change: function(color){
            $(".overlay").hide();
            $("#border_color_input").val(color);
            render_canvas();
        }
    });
    
    $(".ok").click(function (){
        $(".overlay").hide();
        $(".option").removeClass("selected");
        if ($(this).data("no-render"))
            return true;
        arranging = false
        render_canvas();
    });
    
    $(".overlay").click(function (){
        render_canvas();
    });
    
    $("input[name=layout]").change(function (){
        if ($("input[name=layout]:checked").val() == "vert")
            $("#layout .icon").html("&ddarr;");
        else if ($("input[name=layout]:checked").val() == "horiz")
            $("#layout .icon").html("&rrarr;");
        else
            $("#layout .icon").html("&#8862;"+$("input[name=grid_width]").val());
    });
    
    $("input[name=grid_width]").blur(function (){
        if ($("input[name=layout]:checked").val() == "grid")
            $("#layout .icon").html("&#8862;"+$("input[name=grid_width]").val());
    });
    
    $("#bg_input").change(function (){
        $("#bg_color .icon").css("background", $(this).val());
    });
    
    $("#border_color_input").change(function (){
        $("#border .icon").css("background", $(this).val());
        b_size = $("input[name=border_size]").val();
    });
    
    $("input[name=margin_size]").change(function (){
        $("#margin .icon").html($("input[name=margin_size]").val());
    });
    
    $("input[name=layout]").change();
    $("#bg_input").change();
    $("#border_color_input").change();
    $("input[name=margin_size]").change();
    
});

function render_canvas()
{
    // Get settings
    background = $("#bg_input").val();
    layout = $("input[name=layout]:checked").val();
    grid_width = parseInt($("input[name=grid_width]").val());
    border_size = parseInt($("input[name=border_size]").val());
    border_color = $("#border_color_input").val();
    margin = parseInt($("input[name=margin_size]").val());
    //console.log("BG", background, "Layout", layout, "GW", grid_width, "Border", border_size, border_color, "Margin", margin);
    
    // Prepare canvas sizing
    var ctx = document.getElementById('canvas').getContext('2d');
    max_width = $("#content").width();
    max_height = $("#content").height();
    $("#canvas").css({"max-width":max_width-2+"px", "max-height":max_height-2+"px"});
    
    // Determine the final canvas size required
    if (layout == "vert")
    {
        final_width = 0;
        final_height = 0;
        for (var idx=0; idx < images.length; idx++)
        {
            i_width = images[idx].width;
            i_height = images[idx].height;
            
            final_width = Math.max(final_width, i_width + (2*border_size) + (2*margin)); // Clamped to largest image
            final_height = final_height + i_height + (2*border_size) + (2*margin); // Grows per image
        }
    }
    else if (layout == "horiz")
    {
        final_width = 0;
        final_height = 0;
        for (var idx=0; idx < images.length; idx++)
        {
            i_width = images[idx].width;
            i_height = images[idx].height;
            
            final_width = final_width + i_width + (2*border_size) + (2*margin); // Grows per image
            final_height = Math.max(final_height, i_height + (2*border_size) + (2*margin)); // Clamped to largest image
        }
    }
    else if (layout == "grid")
    {
        rows = [];
        for (var idx=0; idx < images.length; idx += grid_width)
        {
            row = [];
            for (var offset=idx; offset < (idx + grid_width); offset++)
            {
                if (offset < images.length)
                    row.push(images[offset]);
            }
            rows.push(row);
        }
        console.log(rows);
        
        // Figure out which row is the widest, and how tall the sequence is
        final_width = 0;
        final_height = 0;
        
        for (var idx=0; idx < rows.length; idx++)
        {
            row_width = 0;
            row_height = 0;
            
            for (var offset=0; offset < (rows[idx].length); offset++)
            {
                console.log("Scanning idx/offset", idx, offset);
                i_width = rows[idx][offset].width;
                i_height = rows[idx][offset].height;
                
                row_width = row_width + i_width + (2*border_size) + (2*margin); // Grows per image
                row_height = Math.max(row_height, i_height + (2*border_size) + (2*margin)); // Clamped to largest image
            }
            
            final_height += row_height; // Grows per row
            final_width = Math.max(row_width, final_width)
            console.log("FINAL HEIGHT...", final_height);
        }
    }

    // Adjust Canvas
    c_width = (final_width ? final_width : 500);
    c_height = (final_height ? final_height : 500);
    $("#canvas").attr("width", c_width);
    $("#canvas").attr("height", c_height);
    $("#canvas").css({"width":c_width, "height":c_height});
    
    // Apply background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, c_width, c_height);
    
    var x = 0;
    var y = 0;
    var tallest = 0;
    
    for (var idx=0; idx < images.length; idx++)
    {
        if (layout != "grid")
        {
            // Adjust for magin
            if (margin > 0)
            {
                x += margin;
                y += margin;
            }
            
            // Draw border
            if (border_size > 0)
            {
                ctx.fillStyle = border_color;
                ctx.fillRect(x, y, (2*border_size + images[idx].width), (2*border_size + images[idx].height));
                x += border_size;
                y += border_size;
            }
        }
        else
        {
            // Adjust for magin
            if (margin > 0)
            {
                x += margin;
                if (idx == 0 || (idx) % grid_width == 0) // New row means vertical margin
                    y += margin;
            }
            
            // Draw border
            if (border_size > 0)
            {
                ctx.fillStyle = border_color;
                ctx.fillRect(x, y, (2*border_size + images[idx].width), (2*border_size + images[idx].height));
                x += border_size;
                if (idx == 0 || ((idx) % grid_width == 0)) // New row means vertical border
                    y += border_size;
            }
        }
        
        // Draw Image
        //alert("Drawing at: " + x + "/" + y);
        ctx.drawImage(images[idx], x, y);
        
        // Adjust X/Y for next image based on layout
        if (layout == "vert")
        {
            x = 0;
            y = y + images[idx].height + border_size + margin;
        }
        else if (layout == "horiz")
        {
            x = x + images[idx].width + border_size + margin;
            y = 0;
        }
        else if (layout == "grid")
        {
            if ((idx + 1) % grid_width == 0)
            {
                y += tallest + border_size + margin; // Height of tallest image in row + border + margin
                x = 0;
                tallest = Math.max(0, images[idx].height);
            }
            else
            {
                x = x + images[idx].width + border_size + margin;
                tallest = Math.max(tallest, images[idx].height);
            }
        }
    }   
    
    // Create DL link
    var date = Math.round(new Date().getTime() / 1000);
    var filename = "stitchr_"+date+".png";
    $("#canvas").attr("download", filename);
}

function render_order()
{
    $("#order_area").html("");
    output = ""
    for (var idx = 0; idx < images.length; idx++)
    {
        output += '<div class="image"><img src="'+images[idx].src+'"></div>';
    }
    $("#order_area").html(output);
    
    $("#order_area .image").click(function (){
        $("#order_area .image").removeClass("selected");
        $(this).addClass("selected");
    })
}