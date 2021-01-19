/* Prefix AI stands for articles_indexer */

const AI_SITEMAP = './sitemap.txt'
const AI_CONTAINER = 'all_posts'
const AI_POST = 'post'

const ai_prettify = function(str){
    str = str.replace(/[-_]/g, ' ')
    str = str.toLowerCase()

    return str
}

const ai_decode_url = function(path){
    let url_parts = path.split('/')
    let post = false

    if(url_parts[3] == AI_POST){
        post = {}
        
        post['url'] = path

        let post_name = url_parts[4].split('.')[0]
        let post_name_parts = post_name.split('-')
        
        let post_date = [post_name_parts.pop(), post_name_parts.pop(), post_name_parts.pop()]
        post_date = post_date.reverse()
        post['day'] = post_date.join(' ')
        post['date'] = new Date(post['day'])

        post['name'] = post_name_parts.join(' ')
    }
    
    return post
}

const ai_display = function(all_urls){
    all_urls = all_urls.split('\n')
    let posts = []

    for(let i=0; i<all_urls.length - 1; i++){
        posts.push(ai_decode_url(all_urls[i]))
    }

    posts.sort(function(a, b){
        return b.date - a.date;
    })
    
    for(let i=0; i<=posts.length; i++){
        let post = posts[i]
        if(post && post['name'] != ''){
            document.getElementById(AI_CONTAINER).innerHTML += '<li><a href="' + post['url'] + '" class="no-decoration">' + post['name'] + '</a><br><h5>' + post['day'] + '</h5></li>'
        }
    }
            
}

window.onload = function(){
    let x = new XMLHttpRequest()
    x.onreadystatechange = function(){
        if (x.readyState == XMLHttpRequest.DONE){
            if(x.status == 200){
                ai_display(x.responseText)
            }
        }
    }
    x.open('GET', AI_SITEMAP, true)
    x.send()
}
