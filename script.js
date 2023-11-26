/* styles.css */

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #1a1a1a;
    color: #fff;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
}

h1 {
    font-size: 2em;
    margin-bottom: 20px;
    margin-top: -20%;
    opacity: 0; 
    animation: fadeInUp 1.5s forwards; /* Fade in */
}

#background {
    position: fixed;
    bottom: -50%; 
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0; 
    animation: fadeInUp 1.5s forwards, glideUp 2s forwards; /* Fade in and glide */
}



#grass {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

#cow {
    position: absolute;
    bottom: 27.4%;
    right: -20%; /* !!!!!!!!!!!!Start Cow From more right!!!!!!!!!!!!!!!!!!!*/
    width: 200px; 
    height: auto;
    display: block;
    z-index: -2;
    opacity: 0; 
    animation: fadeInUp 2.5s forwards, slideIn 2.5s forwards; /* Fade in and slide*/
}

/* Keyframes*/

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes glideUp {
    to {
        bottom: 0;
    }
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateX(-100%); /*how far cow moves*/
    }
}
