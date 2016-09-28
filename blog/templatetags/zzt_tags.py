from django import template
from django.template import Template, Context, Library

register = Library()

@register.tag(name="scroll")
def scroll(parser, token):
    nodelist = parser.parse(('endscroll',))
    parser.delete_first_token()
    return ZztScroll(nodelist)

class ZztScroll(template.Node):
    def __init__(self, nodelist):
        self.nodelist = nodelist
    
    def render(self, context):
        #return "--SCROLL--"
        raw = self.nodelist.render(context)
        output = "<div class='zzt-scroll'>\n"
        
        raw = raw.split("\n")
        
        if raw[0] != "" and raw[0][0] == "@":
            output += "<div class='name'>"+raw[0][1:]+"</div>\n"
        else:
            output += "<div class='name'>Interaction</div>\n"
        
        output += "<div class='content'>\n"
        
        for line in raw[1:]:
            if line and line[0] == "$":
                output += "<div class='c white'>"+line[1:]+"</div>\n"
            elif line and line[0] == "!":
                output += "<div class='hypertext'>"+line.split(";", 1)[-1]+"</div>\n"
            else:
                output += line + "<br>\n"
        
        output += "</div>\n</div>\n"
        return output