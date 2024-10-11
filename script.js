document.addEventListener("DOMContentLoaded", function() {
    const blogEntries = [
        { title: "Blog Post 1", img: "blog1.jpg", content: "This is the first blog post." },
        { title: "Blog Post 2", img: "blog2.jpg", content: "This is the second blog post." }
    ];

    const portfolioProjects = [
        { title: "Project 1", img: "project1.jpg", description: "Description of project 1." },
        { title: "Project 2", img: "project2.jpg", description: "Description of project 2." }
    ];

    const blogContainer = document.getElementById("blog-entries");
    blogEntries.forEach(entry => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${entry.title}</h3><img src="${entry.img}" alt="${entry.title}"><p>${entry.content}</p>`;
        blogContainer.appendChild(div);
    });

    const portfolioContainer = document.getElementById("portfolio-grid");
    portfolioProjects.forEach(project => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${project.title}</h3><img src="${project.img}" alt="${project.title}"><p>${project.description}</p>`;
        portfolioContainer.appendChild(div);
    });
});

