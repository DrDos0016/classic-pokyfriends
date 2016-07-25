import json
import urllib
import re
from bs4 import BeautifulSoup
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    data = {}
    return render(request, "stitchr/index.html", data)
    
def load_url(request):
    url = request.POST.get("url")
    html = urllib.urlopen(url).read()
    soup = BeautifulSoup(html, 'html.parser')
    
    url2 = None
    for tag in soup.find_all(class_="photoset"):
        if tag.name == "iframe" and tag.has_attr("src"):
            url2 = tag["src"]
            
    if url2:
        html = urllib.urlopen(url2).read()
        soup = BeautifulSoup(html, 'html.parser')    
        
        images = []
        for tag in soup.find_all("a"):
            if tag.has_attr("data-photoset-index") and tag.has_attr("href"):
                images.append(tag["href"])
    else:
        #for tag in soup.find_all(class_="photo-slideshow"):
        return HttpResponse('{"status":"FAILURE", "msg":"No photoset information was found"}')
    
    
        
    output = {"status":"SUCCESS", "images":images} # DEBUG
    
    
    return HttpResponse(json.dumps(output))