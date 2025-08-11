const form = document.getElementById('formConfirm')
const msg = document.getElementById('msg')

const BACKEND_URL = 'https://cha-da-flavia-back-production.up.railway.app'


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = form.nome.value.trim()
    const fralda = form.fralda.value
    const mimo = form.mimo.value.trim()

    if(!nome || !fralda) { 
        msg.textContent = 'Por favor, preencha o nome e o tamanho da fralda.'
        msg.style.color = 'red'
        return

    }

    try {
        const res = await fetch(`${BACKEND_URL}/confirmar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, fralda, mimo })
        })

        if(res.ok) {
            msg.textContent = 'Presença confirmada, obrigado!'
            msg.style.color = 'green'
            form.reset()
            form.nome.focus()
        } else {
            const data = await res.json()
            msg.textContent = data.error || 'Erro ao confirmar.'
            msg.style.color = 'red'
        }
    } catch (error) {
        msg.textContent = 'Erro de conexão'
        msg.style.color = 'red'
        
    }
})