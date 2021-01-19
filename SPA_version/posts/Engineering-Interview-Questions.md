Engineering Interview Questions
-------------------------------

Hiring the right talent is a considerably big part of the job that I do. Easier said than done, trust me!! Anyways, I've found the formula to get the best of the best engineers for my team. Whoever scores highest when the following formula is applied is usually my first choice... It's really simple

_{[(1 + (Past performance of the candidate X number of years of experience the candidate has))/100] * Some more bull$@#%}_

ha ha ha... I hope you are having a smile on your face right now. Let me assure you, there is no magic formula using which you can hire the right person. While "HR experts" might or might not hate me for saying this, let me tell you... Hiring is a highly subjective matter which more often than not are dependent on one or more of - Gut Feeling, Personal Opinion, Performance in the interview/screening, consensus among the interviewers, how many times were you disturbed during the interview etc.

Typically an interview lasts about 40 - 50 minutes. While I've conducted interviews which have lasted well over an hour, I've also conducted interviews which have lasted no more than 10 minutes. A few sheets of paper and pen usually suffice in most interviews but occasionally it does call for a whiteboard. The candidates are free to use pseudo code or any programming language they are comfortable with, to answer the questions. Anyways, here I am listing down some of the questions that I use and some logic behind why I use them while hiring engineers. 

After the customary introductions, I generally start off with some really vanilla flavored questions. Though the primary idea behind asking these questions is to get the candidate to feel a little more comfortable, you'd be surprised to know that many candidates are unable to answer these questions convincingly.

**1. Write a function which takes 2 numbers (x,y) and returns the product (x * y) using only addition. You are not allowed to use * operator, however you are free to use other language constructs like loops and conditional statements.**   
An acceptable pseudo code is...
```
function multiply_using_add(x,y){
    product = 0;
    for(i=0; i < y; i++){
        product = product + x;
    }
    return product;
}
```

**2. Write a function which takes 2 whole numbers (x,y) and returns the quotient (x / y) and the remainder (x % y), using only subtraction. You are not allowed to use / or * operators, however you are free to use other language constructs like loops and conditional statements.**   
An acceptable pseudo code is...
```
function divide_using_sub(x,y){
    if(y == 0){
    return ERROR;   //Most candidates skip this part
    }

    quotient = 0;
    while(x >= y){
        x = x - y;
        quotient++;
    }
    remainder = x;
    return (quotient, remainder)
}
```

I am a big fan of pointers. Though it does not warrant much use in the web scripting world, I personally believe that every good engineer must have a sound understanding of pointers. Therefore the next question.   
**3. Given a simple string (ex: community, anna etc.), write a function to check whether it is a palindrome.**
Many candidates, especially the ones fond of PHP will probably try simpler means like reversing the string and checking for equality, to solve this problem. If that turns out to be the case then I specifically ask that they use pointers and solve this problem.
```
function check_palindrome(str){
    len = string_length(str);   //Considering string as an array of characters
    *ptr1 = str;    //Pointer to first character
    *ptr2 = str + len;  //Pointer to last character

    for(i=0; i < len/2; i++){
        ptr1  += i;
        ptr2  -= i;
        if(*ptr1 != *ptr2){
            return FALSE;
        }
    }
    return TRUE;
}
```

In between these I occasionally throw in a question or two about the projects that the candidate has worked on in the recent past or the kind of duties he/she performed the previous role etc. The above problems are standard programming challenges. Now, its time to test his/her ability to ask the right questions, the capability to understand the requirements and build a solution from ground up. The thing to look for here is not the solution itself rather the course that the candidate takes to arrive at that solution.   
**4. Discussing about architecture and design of a popular open source project or a famous product with hypothetical features and improvements, helps.**

If the candidate is expected to have some orientation towards database systems or the resume says that he/she has some orientation towards databases, then this is one question I always ask...   
**5. Given a situation (high reads or high writes or bit of both) which is the best suited database engine and why??**   
There is no wrong or right answer to this one. It mostly depends on the candidates' assumption and understanding of the situation as presented in the question. The answer will be more a discussion than one sided. This will more often than not tell whether the candidate just wrote queries using the wrapper/library available in the language or has dived deep to understand the actual reasons for certain choices made. One other thing that I evaluate while having such conversation is the ability of the candidate to convince or hold a technical debate.

One other question that I ask at a bit advanced level is...   
**6. What is long polling?? What are the pitfalls of using long polling in a client server application like chat??**
Once again this tests the sound understanding of theory. One potential pitfall is having a carelessly written client function call and spawn multiple long polling server threads which will mostly sleep. There are at least 2 more that I can think of. Once again the beauty is not in the answer itself but how the answer is conveyed and convinced.

When interviewing for senior positions, I do like to have some high level design discussions of many problems that are part and parcel of a web product built to scale. Some of my favorites are...
1. Jobs & Background Processing
2. Image Manipulation
3. Supply Chain Management
Or some other current problem that we may be trying to solve in the day to day life.

If I have anything to say to a candidate looking for a job, then I would say _"Dude, your interviewer is also a fellow programmer, be true to yourself; don't pretend. State what you know with confidence and if you don't know something say that with confidence too but make sure you show how quick of a learner you are... that's all that matters"_

--   
Vinay Kumar NP   
12 August, 2013