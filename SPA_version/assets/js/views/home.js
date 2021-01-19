views.home = function(data, params){
    var api_stub = 'posts/index.json';
    
    utils.request(
        api_stub,
        'home_page',
        'home_page_error'
    );
};