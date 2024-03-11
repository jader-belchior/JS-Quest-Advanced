const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do userName" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <h2>Followers: ${user.followers} <br> Following: ${user.following}</h2>
                                                <p>${user.bio ?? 'Não possui bio cadastrado 😢'}</p>
                                            </div>
                                        </div>`

        let repositoriesItens = ""
        user.repositories.forEach(repo => {
            repositoriesItens += `  <li>
                                        <a href="${repo.html_url}" target="_blank"> ${repo.name} <br>
                                            <div>
                                                <div><i class="fa-solid fa-utensils"></i>  ${repo.forks_count}</div>
                                                <div><i class="fa-solid fa-star"></i>  ${repo.stargazers_count}</div>
                                                <div><i class="fa-solid fa-eye"></i>  ${repo.watchers_count}</div>
                                                <div><i class="fa-solid fa-code"></i>  ${repo.language}</div>
                                            </div>
                                        </a>
                                    </li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += ` <div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ""
        user.events.forEach(event => {
            if (event.type === 'PushEvent' || event.type === 'CreateEvent') {
                let message = "";

                if (event.payload && event.payload.commits && event.payload.commits.length > 0) {
                    message = event.payload.commits[0].message;
                }

                if (message === '')
                {
                    eventsItens += `<li>${event.repo.name} <span> - No message found 😥</span></li>`
                }
                else{
                    eventsItens += `<li>${event.repo.name} <span> - ${message}</span></li>`
                }
                
            }

        })
        if (eventsItens != "") {
            this.userProfile.innerHTML += ` <div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}

export { screen }