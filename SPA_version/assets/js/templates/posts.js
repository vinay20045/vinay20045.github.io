templates.recent_posts = function(data){
    var content = `
        <div id="recent_posts" class="">
            <h2>Top Posts</h2>

            <h3><a href="https://blog.16metrics.com/the-real-case-for-ai-powered-bots-57b3dbba9747">The real case for AI powered bots</a></h3>
            <p>Conversational User Interfaces (CUIs) backed by machine learning algorithms with a sprinkling of Natural Language Processing (NLP) also known famously as bots are all the rage these days. Every app wants to be one. Every developer aspires to write one. Will every user be happy to use one? more importantly, <b>will YOUR user be happy to use one?</b> Now, that's the 1,000,000$ question....</p><br>

            <h3><a href="#post?Building-a-single-page-application-with-vanilla-js">Building a single page application with vanilla js</a></h3>
            <p>Often times I've come across this framework vs that framework debate. Many times as an observer, some times as a participant and occasionally as the person who <i>cough</i> started the debate <i>cough</i>. Most frequent arguments in these debates are around the comparitively easy ways to do stuff_ or the lesser code needs to be written points. What I don't see people talking about is writing vanilla js and structuring your project better instead of using a framework....</p><br>

            <h3><a href="#post?40,000+-Users-in-3-months...-Story-of-a-Product-I-built">40,000+ users in 3 months... Story of a product I built</a></h3>
            <p>It's been some time since I wrote something here. 8 months almost. No excuses!! Well, it's time to indulge in another retrospection. Here is the story of the time when myself and Poornima built a product from ground up and then sadly had to shut it down roughly after 3 months from the time we got our first user...</p><br>
        </div>
    `;

    return content;
};

templates.all_posts = function(data){
    var content = `
        <div id="all_posts" class="">
            <h2>All Posts</h2>
    `;
    no_of_posts = data.length;
    for(var i = 0; i < no_of_posts; i++) {
        var post = data[i]
        content = content + `
            <h3><a href="`+post.link+`">`+ post.title +`</a></h3>
            <i>posted on `+ post.published_on +`</i><br>
            <i>tags: `+ post.tags +`</i>
            <br><br>
        `;
    }
    content = content + '</div>';

    return content;
}