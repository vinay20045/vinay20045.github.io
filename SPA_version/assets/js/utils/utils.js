var utils = (function(){

    var extract_params = function(params_string){
        var params = {};
        var raw_params = params_string.split('&');
        
        var j = 0;
        for(var i = raw_params.length - 1; i >= 0; i--){
            var url_params = raw_params[i].split('=');
            if(url_params.length == 2){
                params[url_params[0]] = url_params[1];
            }
            else if(url_params.length == 1){
                params[j] = url_params[0];
                j += 1;
            }
            else{
                //param not readable. pass.
            }
        }

        return params;
    };

    return {
        router: function(route, data){
            route = route || location.hash.slice(1) || 'home';

            var temp = route.split('?');
            var route_split = temp.length;
            var function_to_invoke = temp[0] || false;
            
            if(route_split > 1){
                var params  = extract_params(temp[1]);
            }

            //fire away...
            if(function_to_invoke){
                views[function_to_invoke](data, params);
            }
        },

        render: function(element_id, content, convert_markdown){
            convert_markdown = convert_markdown || false;
            if(!convert_markdown){
                document.getElementById(element_id).innerHTML = content;
            }
            else{
                var converter = new showdown.Converter();
                document.getElementById(element_id).innerHTML = converter.makeHtml(content);   
            }
            document.getElementById(element_id).scrollIntoView();
        },

        //This function is for illustration as there is really no need for ajax here...
        request: function(api_stub, success_callback, error_callback, callback_params){
            api_stub = api_stub || '';
            callback_params = callback_params || {};

            controllers.show_loader('page-content');

            var url = config.api_server + api_stub;

            var x = new XMLHttpRequest();
            x.onreadystatechange = function(){
                if (x.readyState == XMLHttpRequest.DONE) {
                    if(x.status == 200){
                        controllers[success_callback](
                            x.responseText, 
                            callback_params
                        );
                    }
                    else{
                        controllers[error_callback](
                            x.status, 
                            callback_params
                        );
                    }
                }
            };
            //other methods can be implemented here
            x.open('GET', url, true);
            x.send();
        },

        get_link: function(post){
            var link = '#post?'+post.post;
            if(post.external_link){
                link = post.external_link;
            }
            return link;
        }
    }
})();