# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from pokyfriends_web.common import *
import codecs

# Create your views here.

#TODO: Actually Implement _using_ pages
def archive(request, page=1):
    data = {}
    data["latest"] = Post.objects.only("id", "title").filter(published=True).order_by("-id")[:10]
    data["tagged"] = Tag.objects.all().order_by("?")[:10]
    rpp = 50
    data["page"] = request.GET.get("page", page)
    data["title"] = "Blog Post Archive"
    data["posts"] = Post.objects.only("title", "timestamp").filter(published=True).order_by("-timestamp")[(page-1)*rpp:(page-1)*rpp+rpp]
    return render(request, "blog/archive.html", data)

def index(request, id=None):
    data = {}
    data["blocks"] = ["about", "v-ad"]
    data["latest"] = Post.objects.filter(published=True).only("id", "title").filter(published=True).order_by("-id")[:10]
    data["tagged"] = Tag.objects.all().order_by("?")[:10]
    if not id:
        posts = Post.objects.filter(published=True, spotlight=True).order_by("-timestamp")[:1]
        data["title"] = "Let's Be Pokyfriends!"
    else:
        posts = Post.objects.filter(pk=int(id), published=True)
        
    data["post"] = posts[0]
    data["title"] = posts[0].title
    data["page"] = int(request.GET.get("p", 1))
    
    if "<!--Page-->" in data["post"].content:
        data["page_count"] = range(1, data["post"].content.count("<!--Page-->")+2)
        data["has_pages"] = True if len(data["page_count"]) > 1 else False
        data["post"].content = data["post"].content.split("<!--Page-->")[data["page"]-1]
        
    return render(request, "blog/index.html", data)
    
def navigate(request, id=None, dir="next"):
    if dir == "next":
        posts = Post.objects.only("id").filter(pk__gt=int(id), published=True).order_by("id")
    if dir == "prev":
        posts = Post.objects.only("id").filter(pk__lt=int(id), published=True).order_by("-id")
        
    if posts:
        post = posts[0]
    else:
        return redirect("blog")
    return redirect("entry", post.id, slugify(post.title))
    
def preview(request):
    if (ENV != "DEV"):
        return redirect("/")
    
    data = {}
    data["blocks"] = ["about", "v-ad"]
    #data["latest"] = Post.objects.only("id", "title").all().order_by("-id")[:10]
    #data["tagged"] = Tag.objects.all().order_by("?")[:10]
    
    post = Post.objects.all()[0]
    post.title = "TEST POST"
    post.author = "Dr. Dos"
    if request.GET.get("id"):
        post.content = codecs.open("/var/projects/pokyfriends/blog/static/blog/posts/"+request.GET.get("id")+"/post.html", "r", encoding="utf-8").read()
    else:
        post.content = "Set get param \"id\" with post ID that has post.html"
    
    data["post"] = post
    data["title"] = post.title
    data["page"] = int(request.GET.get("p", 1))
    
    if "<!--Page-->" in data["post"].content:
        data["page_count"] = range(1, data["post"].content.count("<!--Page-->")+2)
        data["has_pages"] = True if len(data["page_count"]) > 1 else False
        data["post"].content = data["post"].content.split("<!--Page-->")[data["page"]-1]
        
    return render(request, "blog/index.html", data)
    
def tagged(request, page=1, slug=None):
    data = {}
    data["latest"] = Post.objects.filter(published=True).only("id", "title").filter(published=True).order_by("-id")[:10]
    data["tagged"] = Tag.objects.all().order_by("?")[:10]
    data["title"] = "Blog Post Tags"
    data["slug"] = slug
    if slug:
        tag = Tag.objects.get(slug=slug)
        data["tag"] = tag
        data["posts"] = tag.post_set.all().order_by("-id")
    else:
        data["tag_list"] = Tag.objects.all().order_by("name")
    
    return render(request, "blog/tags.html", data)