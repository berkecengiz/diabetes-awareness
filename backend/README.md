# Diabetes Awareness API

## Endpoints

    - User Endpoints:
        User Permission:
            POST /users/sign-up                 -->  Creates new user <done>
            POST /users/login                   -->  Login user <done>

            GET /users/	       	                -->  Get current user
            PUT /users/  	                -->  Update current user

        Admin Permission:
            GET /users/{username}               -->  Get user by username
            GET /users/{user_id}                -->  Get user by ID
            GET /users                          -->  Get all users
            PUT /users/{user_id}                -->  Update user by ID

    -Patient Endpoints:
        User Permission:
            POST user/patient/profile           --> Creates a patient profile
            GET user/patient/me                 --> Get patient details
            PUT user/patient/me                 --> Update patient details

    -Suggestion Endpoints:
        User Permission:
            GET /user/suggestion/random          --> Get random suggestions for patient
            GET /user/suggestion/                --> Get all suggestions for patient
            GET /user/suggestion/{title}        --> Get all suggestions for patient
            PUT /user/suggestion/{title}        --> Complete the suggestion

        Admin Permission:
            POST /suggestion/                   --> Create a new suggestion

    -Learning Endpoints:
        User Permission:
            GET /user/learning/random           --> Get a random learning module for patient
            GET /user/learning/                 --> Get all the learning modules for patient

            GET /user/learning/{title}          --> Get learning module by ID
            PUT /user/learning/{title}          --> Complete learning

        Admin Permission:
            POST /learning                      --> Create a new learning module

    -Dashboard Endpoints:
        User Permission:
            GET /user/dashboard                 --> GET dashboard prepared for the user
            GET /user/dashboard/{graph_id}      --> GET dashboard graph by ID
            POST /user/dashboard/save           --> Save dashboard to computer
            POST /user/dashboard/share          --> Share dashboard via e-mail