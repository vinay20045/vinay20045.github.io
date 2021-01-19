controllers.show_post = function(data, params){
    //var content = templates.post(templates_context);
    var content = data;
    utils.render(
        'page-content',
        content,
        true
    );
};

controllers.show_post_error = function(data, params){
    utils.render(
        'page-content',
        data
    );
};

controllers.show_all_posts = function(data, params){
    var all_posts = JSON.parse(data);

    var template_context = [];
    var temp = all_posts.length;
    for (var i = 0; i < temp; i++){
        var post = all_posts[i];
        var item = {
            'link': utils.get_link(post),
            'title': post.post.replace(/-/g, ' '),
            'published_on': post.added_on,
            'tags': post.tags.join(', ')
        };
        template_context.push(item);
    }

    utils.render(
        'page-content',
        templates.all_posts(template_context)
    );    
};

controllers.show_all_posts_error = function(data, params){
    utils.render(
        'page-content',
        data
    );
};

controllers.search_posts = function(data, params){
    utils.render(
        'page-content',
        data
    );
};