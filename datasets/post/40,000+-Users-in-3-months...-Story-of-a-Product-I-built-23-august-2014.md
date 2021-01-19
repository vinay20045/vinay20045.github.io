40,000+ Users in 3 months... Story of a Product I built
-------------------------------------------------------
##### Last Updated: 10 January, 2021 | First Published: 23 August, 2014

It's been some time since I wrote something here. 8 months almost. No excuses! Well, it's time to indulge in another retrospection. Here is the story of the time when myself and [Poornima][1] built a product from ground up and then sadly had to shut it down roughly after 3 months from the time we got our first user.

It was early summer of 2010. I was watching a late night episode (Season 4 Episode 20) of Bones on Star World. The plot basically revolves around the team finding a female body in a cardboard box recycling center and the usual grind of going about finding the killer. Somewhere in the middle of the episode, when one of the doctors switches on the victim's phone, another doctor's phone in the room rings with their profile photos on each others' phone. Eureka! I just thought to myself, I am going to build this application. I called up my uncle who was kind enough to pick up the phone and listen to me ramble about some crazy idea and even give some helpful tips. I met Poornima the next morning and explained the idea to her. She was skeptical but she was in.

Basically, taking inspiration from the episode, I sat up all night thinking about an application (not the typical mobile app) which...

1. is location based
2. should work on every phone (smart or dumb)
3. should be fun and addictive to use
4. is free for users
5. has a solid revenue model (I wasn't a fan of get users first and think about revenue later strategy)

I had only one pivotal use case that the application needed to fulfill. Just imagine... 'A guy sitting in a cafe, alone, bored; sends a message to Date or Hate and in 5 minutes the application connects him to a gal sitting right behind him in the cafe or someone a couple of blocks away' the possibilities would be endless.

Then we sat and refined the idea. It was fairly straightforward. A user had to send an SMS giving their location in terms of some pre defined and understood keywords or PIN codes (ex: JP Nagar or 560062) and the system would apply a matching algorithm and connect 2 users based on the closeness of their locality and place a call back to them, take them in conference and allow them to talk for 3 minutes. Since, it was a call service it would be available from 6 AM to 10 PM only. No hassles. Completely anonymous as there is no sharing of numbers. It's free. Simply connects people who are looking for other people close by.

The revenue model was simple too. We would take the route of placing short in call ads with location specific content and offers etc. during wait times and once in between the call. Roughly, the beginning of the call would be something in the lines of... "Welcome to Date or Hate. This call is sponsored by Sadguru Insurances, your trusted insurance agent for all your life and vehicle insurance needs".

The technicalities of setting up the system was as follows...

- The application was built on top of CentOS.
- The server was Apache.
- The database was MySQL (partly because I had not worked with any other database till that point in time).
- All API end points were written in PHP. 
- SMS service was provided by an external vendor, who gave us a 10 digit number and all SMS sent to that number would be pushed on our API.
- The calling API was built on top of Asterisk. This was deployed on a separate server cluster (of 2 servers, set up in house accessed via a static IP) which had a 2 port Sangoma PRI card. In a nutshell, this API... 
    - would take 2 10 digit mobile numbers, an ad file name as input.
    - place a call to both these numbers and conference them once it connects.
    - play a welcome message
    - play the ad identified by the file sent as input before beginning the conference.
    - record the call if abuse is reported (pressing * during the call would trigger abuse report).
    - returns the state post call termination
- The ad files were stored locally on call servers for optimized/speedy delivery.
- The telephone lines were provided by Airtel. A total of ~40 lines were used (over 3 PRI lines).
- The number matcher would run every five minutes or if there are enough pairs of numbers waiting for the call as there are free telephone lines, match the numbers based on the location codes and place a request to the call server with pairs of numbers and ad files.
- The matching algorithm would employ a radius based matching technique.
- I had built a crude reporting cum monitoring cum make us feel good dashboard, which would query db and asterisk server and display some numbers under various headings.

All of this took us roughly about 6 weeks to achieve. Poornima called up a journalist friend of ours and explained to him the whole concept and gave a demo. He was excited to hear about it as we were probably the first ones in the country to build such a product at the time. He agreed to write a small piece on our product in the newspaper where he was working.

![Date or Hate article in Bangalore Mirror](../uploads/date-or-hate-in-bangalore-mirror.jpg)

On the morning of 30 July, 2010 the article (shown above), introducing our product to the world, appeared. Since we had an intimation about when the article would be out, we were awake the whole of previous night checking and cross checking the setup etc. I had optimized the hell out of the MySQL server. Naturally, we went home at around 6 in the morning to freshen up, get some news paper copies and planned to come back to office by around 11 AM. I had forgotten to take the laptop home.

Before I go further, let me tell you what kind of numbers we were expecting and plans we had made. Since we did not have a precedent similar to our product we estimated that we would probably get about 3,000 to 5,000 users in the first 3 months. Post which we could take the service to other cities. We also thought that until this stage we will not play ads but only welcome messages. This would also give us enough time to prepare a proper advertisers kit and back end similar to Ad Words and take it to companies who can advertise with us.

We came back to office around noon. I switched on the laptop only to find that the monitoring dashboard was showing 670 users. This was a pleasant shock as we had never expected so many users. But, we thought "ok, people might be curios and trying out". The dashboard was set to refresh itself every 10 minutes. But 20 minutes passed and the number of users was still the same. We thought our product was a flop and people did not like it. I was disappointed. Then I logged in to the VPS server to shut it down as it was costing us money, in dollars, and to our horror we discovered that there were 1700 api calls rejected as we had crossed our bandwidth limit. HORROR! My estimate was wrong. we were having 100s of users using our product. I immediately upgraded the plan, restarted the server and we were back online. At day end we were 1400+ users with 1000s of conferences served. Also, I had been called stupid for the first time by Poornima.

You must be feeling, that this is a happy problem right?! Maybe true for a well funded start up but not for us, just passed out graduates with limited funding and maturity in business. I am not ashamed to admit that, at the time, the only definition of angel I knew was of goddess with wings who appears in cartoons and fiction work. Also, one other reason we were in a crunch was because, I had kept the idea very close to my heart and had refused to discuss this even with my friends.

The users kept growing day on day and hour on hour. We did not know what to do? We had some money of our own which soon got over. Our service business (V Solutions) was running fine, but could not support this product's expenses. We started borrowing from F&F and after about 3 months, we had borrowed, let's say an average government employees' lifetime salary, and still did not have a clear strategy or a way forward to approach advertisers or any other ideas of raising funds.

One day (don't remember exactly which) in November 2010, there we sat, thinking of ways to foot the previous months' telephone bill. This was the moment. The moment when, my life, for years to come flashed in front of my eyes. Sort of like a flash forward. The Entrepreneur in me kept telling... You have a super idea at hand, push forward, things will fall in place. The Engineer in me kept telling... If you can build this, you can build something else too, think about the numbers, it is just not there. Shut it down. I got up, walked to the room where we had kept the call servers, kept my hand on one of the servers, took a moment, a deep breath and pulled out the wire from the wall socket. Poornima was right there behind me. Both of us did not utter a word and went back home in silence.

A lot of users wrote to us asking why nothing was working anymore. So, sometime shortly thereafter, I did put up a webpage explaining that we had shut down and methodically closed down all the servers/services. We did try to revive the project, sometime towards the end of 2012, as a lot of investor friends and consultants who had heard about the project, had  shown some level of interest. But this sort of an application now needed a radically new thought process and significant amount of time commitment. As Poornima was working on [Secret Angel][2] and I was with [CommonFloor][3] full time, this was not possible. Therefore we finally gave up on this project.

This project, Date or Hate, is a constant reminder of the time I had failed, terribly. But, I did learn a lot. A lot. I have carefully preserved all the code, database dumps etc as a reminder of what could've been. I am still trying, in various ways, to put this behind me but it is really really difficult. It is so difficult because, even though this project had/has altered my life, my outlook, my attitude for many years to come, I never got a chance to see that use case fulfilled. Even though I had gotten 42,524 users for my product in less than 3 months, with bare minimal marketing, I still had to shut it down.

The day I get over this is probably when I will become a full time entrepreneur again, I guess!


[1]: http://in.linkedin.com/in/poornimavinaykumar "Poornima Vinaykumar"
[2]: http://www.secretangel.in/ "Secret Angel"
[3]: https://www.commonfloor.com/ "CF"
