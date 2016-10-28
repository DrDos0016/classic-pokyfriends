# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect
from .models import Poll, Option, Vote
from datetime import datetime

# Create your views here.
def faq(request):
    data = {"title":"FAQ - Worlds of ZZT"}
    return render(request, "worlds_of_zzt/faq.html", data)

def index(request):
    data = {"title":"Worlds of ZZT"}
    return render(request, "worlds_of_zzt/index.html", data)
    
def poll(request):
    data = {"title":"Poll - Worlds of ZZT"}
    today = datetime.now().date()
    polls = Poll.objects.filter(end_date__gte=today).order_by("start_date")
    print polls.query
    if polls:
        data["poll"] = polls[0]
        data["key"] = request.GET.get("key", "")
        data["poll_open"] = True if (today >= data["poll"].start_date and today <= data["poll"].end_date) else False
        
        if data["poll_open"] and request.POST.get("vote") and request.POST.get("email"):
            vote = Vote(ip=request.META["REMOTE_ADDR"], timestamp=datetime.now(), email=request.POST["email"], option_id=int(request.POST["vote"]), poll_id=data["poll"].id)
            try:
                vote.save()
            except:
                print "Vote error!"
                
            return redirect("woz_results", id=data["poll"].id)
    
    return render(request, "worlds_of_zzt/poll.html", data)
    
def results(request, id):
    data = {"title":"Poll Results - Worlds of ZZT"}
    data["poll"] = Poll.objects.get(pk=int(id))
    data["poll"].option1_votes = 0
    data["poll"].option2_votes = 0
    data["poll"].option3_votes = 0
    data["poll"].option4_votes = 0
    data["poll"].option5_votes = 0
    
    # Calculate results
    log = {}
    totals = [0,0,0,0,0]
    votes = Vote.objects.filter(poll_id=id).order_by("id")
    
    voters = {}
    
    for vote in votes:
        voters[vote.email] = vote.option_id
        
    # print(voters)
    for k in voters.keys():
        if data["poll"].option1_id == voters[k]:
            data["poll"].option1_votes += 1
            # print("VOTE FOR", data["poll"].option1.name, "BY", k)
        if data["poll"].option2_id == voters[k]:
            data["poll"].option2_votes += 1
            # print("VOTE FOR", data["poll"].option2.name, "BY", k)
        if data["poll"].option3_id == voters[k]:
            data["poll"].option3_votes += 1
            # print("VOTE FOR", data["poll"].option3.name, "BY", k)
        if data["poll"].option4_id == voters[k]:
            data["poll"].option4_votes += 1
            # print("VOTE FOR", data["poll"].option4.name, "BY", k)
        if data["poll"].option5_id == voters[k]:
            data["poll"].option5_votes += 1
            # print("VOTE FOR", data["poll"].option5.name, "BY", k)
    
        
    """
    for k in log.keys():
        if int(id) == 1:
            totals[log[k]-1] += 1
        else:
            totals[log[k]-(int(id)*5 - 5)] += 1
    """
    #data["totals"] = totals
    return render(request, "worlds_of_zzt/results.html", data)