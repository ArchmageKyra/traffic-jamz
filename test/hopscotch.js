//Hopscotch
// Define the tour!
var tour = {
    id: "hello-hopscotch",
    steps: [
      {
        title: "My Header",
        content: "This is the header of my page.",
        target: "header",
        placement: "right"
      },
      {
        title: "My content",
        content: "Here is where I put my content.",
        target: document.querySelector("#content p"),
        placement: "bottom"
      },
        {
            target: "header",
            placement: "bottom",
            title: "This is the navigation menu",
            content: "Use the links here to get around on our site!"
          },
          {
            target: "profile-pic",
            placement: "right",
            title: "Your profile picture",
            content: "Upload a profile picture here."
          },
          {
            target: "inbox",
            placement: "bottom",
            title: "Your inbox",
            content: "Messages from other users will appear here."
      }
    ]
  };

  
  // Start the tour!
  hopscotch.startTour(tour);