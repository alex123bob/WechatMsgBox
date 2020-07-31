import {getPost} from 'api';
import * as _ from 'lodash';

async function Main() {
    // const div = document.createElement('div');
    // const h1 = document.createElement('h1');
    // const h1Text = document.createTextNode('Hello Webpack-Babel-Boilerplate!');
    
    // div.className = 'main';
    // h1.appendChild(h1Text);
    // document.body.appendChild(div);
    // div.appendChild(h1);

    // const postId = 1;
    // const post = await getPost(postId);

    // const postTitle = post.title || 'Oops title was null!';
    // const p = document.createElement('p');
    // const pText = document.createTextNode(postTitle);

    // p.appendChild(pText);
    // div.appendChild(p);

    var commentTemplate = document.getElementById("comment-template").innerHTML;

    //create template function
    var templateFn = _.template(commentTemplate);

    //execute template function with JSON object for the interpolated values
    var templateHTML = templateFn({ 'comment': 'test comment', 'commenter': 'test commenter' });

    document.body.innerHTML += templateHTML + templateHTML;
}

export default Main;