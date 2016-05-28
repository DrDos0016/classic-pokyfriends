from pokyfriends_web.common import *

# Create your views here.

#TODO: Review
def archive(request, page=1):
    data = {}
    data["latest"] = Post.objects.only("id", "title").all().order_by("-id")[:10]
    data["tagged"] = Tag.objects.all().order_by("?")[:10]
    rpp = 50
    data["page"] = request.GET.get("page", page)
    data["title"] = "Blog Post Archive"
    data["posts"] = Post.objects.only("title", "timestamp").all().order_by("-id")[(page-1)*rpp:(page-1)*rpp+rpp]
    return render_to_response("blog_archive.html", data)

def index(request, id=None):
    data = {}
    data["blocks"] = ["about", "v-ad"]
    data["latest"] = Post.objects.only("id", "title").all().order_by("-id")[:10]
    data["tagged"] = Tag.objects.all().order_by("?")[:10]
    if not id:
        posts = Post.objects.all().order_by("-id")[:1]
        data["title"] = "Let's Be Pokyfriends!"
    else:
        posts = Post.objects.filter(pk=int(id))
        
    data["post"] = posts[0]
    data["title"] = posts[0].title
    data["page"] = int(request.GET.get("p", 1))
    
    if "<!--Page-->" in data["post"].content:
        data["page_count"] = range(1, data["post"].content.count("<!--Page-->")+2)
        data["has_pages"] = True if len(data["page_count"]) > 1 else False
        data["post"].content = data["post"].content.split("<!--Page-->")[data["page"]-1]
        
    return render(request, "blog/index.html", data)
    
#TODO: Review
def navigate(request, id=None, dir="next"):
    if dir == "next":
        posts = Post.objects.only("id").filter(pk__gt=int(id)).order_by("id")
    if dir == "prev":
        posts = Post.objects.only("id").filter(pk__lt=int(id)).order_by("-id")
        
    if posts:
        post = posts[0]
    else:
        return redirect("/blog")
    return redirect("/blog/"+str(post.id)+"/"+slugify(post.title))
    
#TODO: Review
def post(request):
    data = {}
    
    if request.POST.get("content"):
        if request.GET.get("id"):       
            post = Post.objects.get(pk=int(request.GET["id"]))
        else:
            post = Post(timestamp=datetime.now())
            
        post.title = request.POST.get("title")
        post.author = request.POST.get("author")
        post.source = request.POST.get("source")
        post.content = request.POST.get("content")
        post.save()
        
        # Tags
        tags = request.POST.get("tags")
        tags = tags.split("#")
        
        post.tags.clear()
        for tag in tags:
            tag = tag.strip()
            if tag:
                t, created = Tag.objects.get_or_create(name=tag, slug=slugify(tag))
                if created:
                    t.save()
                post.tags.add(t)
        post.save()
        
        return redirect("/blog/"+str(post.id)+"/"+slugify(post.title))
    
    data["title"] = "Manage Post"
    data["mode"] = "new"
    data["wip"] = True
    if request.GET.get("id"):       
        data["post"] = Post.objects.get(pk=int(request.GET["id"]))
        data["mode"] = "edit"
        data["tags"] = ""
    return render_to_response("blog_post.html", data, context_instance=RequestContext(request))
    
#TODO: Review
def tagged(request, page=1, slug=None):
    data = {}
    data["latest"] = Post.objects.only("id", "title").all().order_by("-id")[:10]
    data["tagged"] = Tag.objects.all().order_by("?")[:10]
    data["title"] = "Blog Post Tags"
    data["slug"] = slug
    if slug:
        tag = Tag.objects.get(slug=slug)
        data["tag"] = tag
        data["posts"] = tag.post_set.all().order_by("-id")
    else:
        data["tag_list"] = Tag.objects.all().order_by("name")
    
    return render_to_response("blog_tags.html", data)