// function readMoreShow() {
//     $(document).ready(function () {
//         var contents = $(".text-content");
//         var maxLength = 200;

//         contents.each(function () {
//             var content = $(this);
//             var text = content.text();
//             var fullText = text; // Store the full text

//             if (text.length > maxLength) {
//                 var truncatedText = text.substr(0, maxLength) + "...";
//                 content.addClass("truncated").text(truncatedText);

//                 // Add toggle link after each truncated content
//                 content.after('<a href="#" class="toggle-content show">Show more</a>');
//             }

//             // Delegate click event to dynamically added .toggle-content links
//             $(document).on("click", ".toggle-content", function (event) {
//                 event.preventDefault();
//                 var link = $(this);
//                 var content = link.prev(".text-content");
//                 var text = content.hasClass("truncated") ? fullText : fullText.substr(0, maxLength) + "...";

//                 content.toggleClass("truncated").text(text);
//                 link.text(content.hasClass("truncated") ? "Show more" : "Show less");
//             });
//         });
//     });
// }

// remaining bugs to fix:
// 1. fix the unfocused animation
// 2. fix no focused mode
// 3. fix the toggle button



function modeAction(mode,Blog,Body, BLOG_IMG , textContainer,title,contentContainer,animateIt,content,Hcontent){
    console.log("modeAction ");
    
    if(mode === "no focused"){
        Blog.classList.add("unfocused");
        Blog.addEventListener("animationend", () => {
            
            if(/*BLOG_IMG contains title */  BLOG_IMG.contains(title)){
                // delete title from it 
                console.log("con1");
                
                BLOG_IMG.removeChild(title);    
            }
            if(/*text-container Not contains title */  !textContainer.contains(title)){
                // Add title To it 
                console.log("con2");
                textContainer.appendChild(title);
            }
            if(/*animateIt contains text */  animateIt.TextContent != ""){
                // Delete text from it 
                console.log("con3");
                animateIt.TextContent = "";
            }
            if(/*text-content Not contains text */  TextContent.textContent == "" ){
                // Add text To it 
                console.log("con4");
                TextContent.textContent = Hcontent;
            }
            Body.classList.remove("focus");
            Blog.classList.remove("focused");
            Blog.classList.remove("unfocused");
        })
        
    }
    else if(mode === "focused"){
        Blog.classList.remove("unfocused");

        if(/*BLOG_IMG Not contains title */ !BLOG_IMG.contains(title) ){
            // Add title To it  
            console.log("con 1", !BLOG_IMG.contains(title) );
            BLOG_IMG.insertBefore(title,BLOG_IMG.firstChild);
        }
        if(/*text-container  contains title */ textContainer.contains(title)){
            // delete title from it 
            console.log("con 1", textContainer.contains(title) );
            // textContainer.removeChild(title);
        }
        if(/*animateIt doesn't contain text */ animateIt.TextContent == ""){
            // Add text To it 
            console.log("con 1", !BLOG_IMG.contains(title) );
            animateIt.TextContent = Hcontent + content;
        }
        if(/*text-content contain text */ TextContent.textContent != ""){
            // remove text from it 
            console.log("con 1", !BLOG_IMG.contains(title) );
            TextContent.textContent = "";
        }
        Body.classList.add("focus");
        Blog.classList.add("focused");
    }
}
function readMoreShow(){
    console.log("==================================================================================");
    
    const toggleButton = document.querySelectorAll(".toggle-content")[0];
    let BlogId = toggleButton.id;
    let mode = "no focused";
    let BLOG_IMG = document.querySelector(".BLOG_IMG");
    let textContainer = document.querySelector(".text-container");
    let title = document.querySelector(".title");
    let TextContent = document.querySelector(".text-content");
    let animateIt = document.querySelector(".animateIt");
    let Hcontent = document.querySelector(".text-content").textContent;
    let content = document.querySelector(".text-content").textContent;
    let Body = document.querySelector("body");
    let Blog = document.getElementById(BlogId);
    toggleButton.addEventListener("click", () => {
    modeAction(mode,Blog,Body ,BLOG_IMG , textContainer,title,TextContent,animateIt,content,Hcontent);
    console.log("==================================================================================");
    })

}

const toggleButton = document.querySelectorAll(".toggle-content")[0];
    let BlogId = toggleButton.id;
    // let mode = "no focused";
    let BLOG_IMG = document.querySelector(".BLOG_IMG");
    let contentContainer = document.querySelector(".content-container");
    let title = document.querySelector(".title");
    let TextContent = document.querySelector(".text-content");
    let animateIt = document.querySelector(".animateIt");
    let Hcontent = document.querySelector(".text-content").textContent;
    let content = document.querySelector(".text-content").textContent;
    let Body = document.querySelector("body");
    let Blog = document.getElementById(BlogId);
    modeAction(mode,Blog,Body ,BLOG_IMG , contentContainer,title,TextContent,animateIt,content,Hcontent);


readMoreShow();

function loadBlogs() {
    let blogsContainer = document.querySelector(".unPinnedBlogs");
    async function load() {
        try {
            const res = await fetch("../../blogs/getBlogs");
            if (res.ok) {
                let response = await res.json();
                console.log(response);
                let blogs = response.data;
                blogs.forEach((blog) => {
                    let section = `
                    <section class="section">
                        <div class="text-container">
                            <div class="content-container">
                                <h1>${blog.title}</h1>
                                <p class="text-content">${blog.content}</p>
                                <a href="#" class="toggle-content">Show more</a>
                                <!--DATE-->
                                <div class="Date">
                                    <img class="calender" src="../all-images/Calender.png" alt="">
                                    <p class="date-text">${blog.date}</p>
                                </div>
                            </div>
                            <!--IMAGE-->
                            <div class="BLOG_IMG2">
                                <img src="../all-images/blogs/${blog.avatar}" alt="BLOG">
                            </div>
                        </div>
                    </section>`;
                    blogsContainer.innerHTML += section;
                });
            } else {
                console.log("error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    load();
}

try {
    loadBlogs();
} catch (error) {
    console.error(error);
}

