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
                alert("Photoset acquisititon failed. Doublecheck your url, or manually upload the images.")
            }).done(function(data) {
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
    
    $("#add-local").click(function (){
        var file = $("input[name=local]").get(0).files[0];
        upload_file(file);
    });
    
    $("#photoset_overlay").on("dragover", function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $(this).addClass("dragging");
    });

    $("#photoset_overlay").on("dragleave", function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $(this).removeClass("dragging");
    });
    
    $("#photoset_overlay").on("drop", function(event){
        event.preventDefault();  
        event.stopPropagation();
        for (var idx=0; idx < event.originalEvent.dataTransfer.files.length; idx++)
        {
            upload_file(event.originalEvent.dataTransfer.files[idx]);
        }
    });
    
    $("body").on("dragover", function (event) {
        $("#photoset").click();
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
    
    if (grid_width < 1 || grid_width > 9)
        grid_width = 3;
    
    
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
        
        // Figure out which row is the widest, and how tall the sequence is
        final_width = 0;
        final_height = 0;
        
        for (var idx=0; idx < rows.length; idx++)
        {
            row_width = 0;
            row_height = 0;
            
            for (var offset=0; offset < (rows[idx].length); offset++)
            {
                i_width = rows[idx][offset].width;
                i_height = rows[idx][offset].height;
                
                row_width = row_width + i_width + (2*border_size) + (2*margin); // Grows per image
                row_height = Math.max(row_height, i_height + (2*border_size) + (2*margin)); // Clamped to largest image
            }
            
            final_height += row_height; // Grows per row
            final_width = Math.max(row_width, final_width)
        }
    }

    // Adjust Canvas
    c_width = (final_width ? final_width : 500);
    c_height = (final_height ? final_height : 500);
    $("#canvas").attr("width", c_width);
    $("#canvas").attr("height", c_height);
    $("#canvas").css({"width":c_width, "height":c_height});
    
    // Determine offsets to center images
    var offsets = [];
    var offset_x = 0;
    var offset_y = 0;
    var row_heights = [];
    var row_widths = [];
    
    if (layout == "vert" || layout == "horiz")
    {
        for (var idx=0; idx < images.length; idx++)
        {
            total_width = images[idx].width + 2*border_size + 2*margin;
            total_height = images[idx].height + 2*border_size + 2*margin;
            
            if (layout == "vert")
            {
                offset_x = (c_width - total_width) / 2;
                offset_y = 0;
            }
            else if (layout == "horiz")
            {
                offset_x = 0;
                offset_y = (c_height - total_height) / 2;
            }
            offsets.push([offset_x, offset_y]);
        }
    }
    else
    {
        // Figure out how tall the row for each image is
        for (var idx=0; idx < images.length; idx++)
        {
            total_width = images[idx].width + 2*border_size + 2*margin;
            total_height = images[idx].height + 2*border_size + 2*margin;
            
            if (idx % grid_width == 0)
            {
                max_in_row = 0;
                row_width = 0;
                for (var i=0; i < grid_width; i++)
                {
                    if (idx+i < images.length)
                    {
                        max_in_row = Math.max(max_in_row, images[idx+i].height + 2*border_size + 2*margin);
                        row_width += images[idx+i].width + 2*border_size + 2*margin;
                    }
                }
            }
            row_widths.push(row_width);
            row_heights.push(max_in_row);
        }

        // First row starting X-coord
        x = (c_width - row_widths[0]) / 2;
        
        // Vertically center based on this height
        for (var idx=0; idx < images.length; idx++)
        {
            total_width = images[idx].width + 2*border_size + 2*margin;
            total_height = images[idx].height + 2*border_size + 2*margin;
            
            offset_x = 0;
            offset_y = (row_heights[idx] - total_height) / 2;
            offsets.push([offset_x, offset_y]);
        }
    }
    
    // Apply background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, c_width, c_height);
    
    var x = 0;
    var y = 0;
    var tallest = images[0].height;
    
    for (var idx=0; idx < images.length; idx++)
    {
        if (layout == "vert" || layout == "horiz")
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
                ctx.fillRect((x+offsets[idx][0]), (y+offsets[idx][1]), (2*border_size + images[idx].width), (2*border_size + images[idx].height));
                x += border_size;
                y += border_size;
            }
            
            // Draw Image (and make the under area transparent to fix border issues)
            ctx.clearRect(x+offsets[idx][0],y+offsets[idx][1], images[idx].width, images[idx].height);
            ctx.drawImage(images[idx], x+offsets[idx][0], y+offsets[idx][1]);
        }
        else
        {
            // Adjust for magin
            if (margin > 0)
            {
                x += margin;
                if (idx % grid_width == 0) // New row means vertical margin
                    y += margin;
            }
            
            // Draw border
            if (border_size > 0)
            {
                ctx.fillStyle = border_color;
                ctx.fillRect((x+offsets[idx][0]), (y+offsets[idx][1]), (2*border_size + images[idx].width), (2*border_size + images[idx].height));
                x += border_size;
                
                if ((idx + 1) % grid_width == 0) // New row means vertical border
                    y += border_size;
            }
            
            // Draw Image (and make the under area transparent to fix border issues)
            //alert("Drawing at: " + x + "/" + y);
            if ((idx + 1) % grid_width == 0)
            {            
                ctx.clearRect(x+offsets[idx][0],y+offsets[idx][1], images[idx].width, images[idx].height);
                ctx.drawImage(images[idx], x+offsets[idx][0], y+offsets[idx][1]);
            }
            else
            {
                ctx.clearRect(x+offsets[idx][0],y+border_size+offsets[idx][1], images[idx].width, images[idx].height);
                ctx.drawImage(images[idx], x+offsets[idx][0], y+border_size+offsets[idx][1]);
            }
        }
        
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
            if ((idx + 1) % grid_width == 0 && (idx + 1 < images.length)) // New row
            {
                y += tallest + border_size + margin; // Height of tallest image in row + border + margin
                x = (c_width - row_widths[idx + 1]) / 2;
                tallest = Math.max(0, images[idx + 1].height); // Was not +1 before!!
            }
            else if (idx + 1 < images.length)// Existing row
            {
                x = x + images[idx].width + border_size + margin;
                tallest = Math.max(tallest, images[idx + 1].height);
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

function upload_file(file)
{
    url = window.URL || window.webkitURL;
    src = url.createObjectURL(file);
    
    var img = new Image();
    img.src = src;
    img.addEventListener("load", function() {
        image_list.push(file.name);
        images.push(img);
        
        $("#loaded_images").html((parseInt($("#loaded_images").text()) + 1));
        $("#total_images").html(image_list.length);
        if (parseInt($("#loaded_images").text()) == parseInt($("#total_images").text()))
        {
            render_order();
            render_canvas();
        }        
    }, false);
}