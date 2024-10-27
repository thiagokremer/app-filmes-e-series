
async function getAPI() {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjk0Y2VjMzk3OGRjNTcxZjU1NzBhNTk4NTY2ZTIxNiIsIm5iZiI6MTczMDA2NDQ5Ny4wNjU5MjgsInN1YiI6IjY3MWVhZWM4ZmVmZDFlMDUxMDAwOGVmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eNFQvT1d1zE4CmtJoS3LThPFhkICo1Uu-wQSC4-Le4g'
            }
        }

        const resFilmesPopulares = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', options)
        if (resFilmesPopulares.status != 200) {
            throw new Error("Erro ao buscar informações, tente novamente")
        }

        const resFilmesTendencias = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1', options)
        if (resFilmesTendencias.status != 200) {
            throw new Error("Erro ao buscar informações, tente novamente")
        }

        const resTv = await fetch('https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1', options)
        if (resTv.status != 200) {
            throw new Error("Erro ao buscar informações, tente novamente")
        }

        const dadosFilmesPopulares = await resFilmesPopulares.json()
        const dadosFilmesTendencias = await resFilmesTendencias.json()
        const dadosTv = await resTv.json()


        const poster = "https://image.tmdb.org/t/p/w500"
        const bg = "https://image.tmdb.org/t/p/original"

        const sessaoFilmes = document.getElementById("filmes")
        const sessaoTendencias = document.querySelector(".cards-tendencias")
        const sessaoSeries = document.getElementById("series")


        const mainFilme = dadosFilmesPopulares.results[0]
        const mainTitulo = document.querySelector(".home-content h1")
        mainTitulo.textContent = mainFilme.title

        const mainDescricao = document.querySelector(".home-content p")
        mainDescricao.textContent = mainFilme.overview

        const mainPoster = document.querySelector(".thumb-home img")
        mainPoster.src = poster + mainFilme.poster_path

        const mainSessao = document.getElementById("home")
        mainSessao.style.backgroundImage = `url(${bg + mainFilme.backdrop_path})`



        for (let i = 1; i < 19; i++) {
            const filme = dadosFilmesPopulares.results[i]
            //console.log(filme)

            const div = document.createElement("div")
            div.innerHTML = `
                <img src="${poster + filme.poster_path}" alt="${filme.title}">
                <h1>${filme.title}</h1>
            `
        
            sessaoFilmes.appendChild(div)
        }


        for (let i = 0; i < 18; i++) {
            const serie = dadosTv.results[i]
            //console.log(serie)
            
            const div = document.createElement("div")
            div.innerHTML = `
                <img src="${poster + serie.poster_path}" alt="${serie.name}">
                <h1>${serie.name}</h1>
            `

            sessaoSeries.appendChild(div)
        }


        for (let i = 0; i < 5; i++) {
            const tendencia = dadosFilmesTendencias.results[i]
            console.log(tendencia)
            
            const div = document.createElement("div")
            div.style.backgroundImage = `url(${poster + tendencia.poster_path})`
            div.innerHTML = `
                <h1>${tendencia.title}</h1>
            `

            sessaoTendencias.appendChild(div)
        }

        
    } catch (error) {
        alert(error.message)
    }
}
getAPI()