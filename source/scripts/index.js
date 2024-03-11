import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

// Programar botão de busca
document.getElementById('btn-search').addEventListener('click', () => {
    let userName = document.getElementById('input-search').value;
    if(validateEmptyInput(userName)) return
    getUserData(userName)
    document.getElementById('input-search').value = ''
})
// Programar busca pressionando 'enter'
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return
        getUserData(userName)
        e.target.value = ''
    }
})
// Função de validação de input
function validateEmptyInput(userName){ //Deve ser chamado como 'if(validateEmptyInput(userName)) return' dentro de outras funções 
    if (userName.trim().length === 0 ){ //Não pesquisar se não inserir nada no campo de pesquisa
        alert('Preencha o campo com o nome do usuário do GitHub')
        document.getElementById('input-search').value = ''
        return true
    }
}
// função principal, onde se executa os queries e renderiza as informações na pagina
async function getUserData(userName) {
    const userResponse = await getUser(userName) // services-user

    if (userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName) // services-repositories
    const eventsResponse = await getEvents(userName) // services-repositories

    user.setInfo(userResponse) // object-user
    user.setRepositories(repositoriesResponse) // object-user
    user.setEvents(eventsResponse) // object-user


    screen.renderUser(user) // object-screen
}