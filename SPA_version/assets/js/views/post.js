views.post = function(data, params){
    var api_stub = 'posts/' + params[0] + '.md';
    
    utils.request(
        api_stub,
        'show_post',
        'show_post_error'
    );   
}