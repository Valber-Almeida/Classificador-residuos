// Elementos da DOM
const imageUpload = document.getElementById("imageUpload")
const cameraButton = document.getElementById("cameraButton")
const captureButton = document.getElementById("captureButton")
const webcam = document.getElementById("webcam")
const preview = document.getElementById("preview")
const placeholderDiv = document.getElementById("placeholderDiv")
const canvas = document.getElementById("canvas")
const classifyBtn = document.getElementById("classifyBtn")
const resultsSection = document.getElementById("resultsSection")
const topResult = document.getElementById("topResult")
const confidence = document.getElementById("confidence")
const predictionList = document.getElementById("predictionList")
const materialDescription = document.getElementById("materialDescription")

// Variáveis globais
let model
const ctx = canvas.getContext("2d")
let isWebcamActive = false

// Informações sobre os materiais
const materialInfo = {
  Battery: {
    nome: "Bateria",
    descricao:
      "Baterias contêm metais pesados e produtos químicos nocivos que podem contaminar o solo e a água. Devem ser levadas a pontos de coleta específicos para descarte adequado.",
  },
  biological: {
    nome: "Resíduo Biológico",
    descricao:
      "Resíduos biológicos incluem restos de alimentos e materiais orgânicos. Podem ser compostados para criar fertilizante natural.",
  },
  "brown-glass": {
    nome: "Vidro Marrom",
    descricao:
      "Vidros marrons, como garrafas de cerveja, podem ser reciclados indefinidamente sem perda de qualidade. Devem ser separados por cor para reciclagem.",
  },
  cardboard: {
    nome: "Papelão",
    descricao:
      "Papelão é altamente reciclável e deve ser limpo, seco e dobrado para facilitar a coleta. Pode ser transformado em novos produtos de papel.",
  },
  clothes: {
    nome: "Roupas",
    descricao:
      "Roupas em bom estado podem ser doadas. Roupas impróprias para uso podem ser recicladas em novas peças ou materiais de isolamento.",
  },
  "green-glass": {
    nome: "Vidro Verde",
    descricao:
      "Vidros verdes, como garrafas de vinho, são 100% recicláveis. Devem ser separados por cor para reciclagem adequada.",
  },
  metal: {
    nome: "Metal",
    descricao:
      "Metais como alumínio e aço são infinitamente recicláveis. A reciclagem de metais economiza até 95% da energia usada para produzir metal a partir de minérios.",
  },
  paper: {
    nome: "Papel",
    descricao:
      "Papel pode ser reciclado em novos produtos. Papéis limpos e secos devem ser separados de outros materiais para reciclagem eficiente.",
  },
  plastic: {
    nome: "Plástico",
    descricao:
      "Plásticos podem ser reciclados em novos produtos, reduzindo a quantidade de plástico em aterros e oceanos. Verifique os códigos de reciclagem para identificar o tipo de plástico.",
  },
  shoes: {
    nome: "Calçados",
    descricao:
      "Calçados em bom estado podem ser doados. Alguns fabricantes e organizações têm programas para reciclar calçados usados em novos produtos.",
  },
  trash: {
    nome: "Lixo Comum",
    descricao:
      "Itens que não podem ser reciclados ou compostados vão para o lixo comum. Sempre tente reduzir a quantidade de lixo não reciclável que você gera.",
  },
  "white-glass": {
    nome: "Vidro Transparente",
    descricao:
      "Vidros transparentes, como garrafas e potes, são 100% recicláveis. Devem ser limpos e separados por cor para reciclagem.",
  },
}

// Inicializar a aplicação
async function init() {
  try {
    console.log("Iniciando carregamento do modelo...")
    // Carregar o modelo usando a biblioteca Teachable Machine
    const modelURL = "./model.json"
    const metadataURL = "./metadata.json"
    model = await window.tmImage.load(modelURL, metadataURL)
    console.log("Modelo carregado com sucesso!")

    // Configurar os eventos de entrada
    setupEventListeners()
  } catch (error) {
    console.error("Erro ao carregar o modelo:", error)
    alert("Não foi possível carregar o modelo. Por favor, verifique o console para mais detalhes.")
  }
}

// Configurar os listeners de eventos
function setupEventListeners() {
  // Evento de upload de imagem
  imageUpload.addEventListener("change", handleImageUpload)

  // Evento de botão de câmera
  cameraButton.addEventListener("click", toggleWebcam)

  // Evento de captura de imagem
  captureButton.addEventListener("click", captureImage)

  // Evento de classificação
  classifyBtn.addEventListener("click", classifyImage)
}

// Lidar com o upload de imagens
function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    // Desativar webcam se estiver ativa
    if (isWebcamActive) {
      toggleWebcam()
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      preview.src = e.target.result
      preview.hidden = false
      placeholderDiv.hidden = true
      preview.onload = () => {
        classifyBtn.disabled = false
      }
    }
    reader.readAsDataURL(file)
  }
}

// Alternar câmera
async function toggleWebcam() {
  if (!isWebcamActive) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 224, height: 224 },
      })
      webcam.srcObject = stream
      webcam.hidden = false
      captureButton.hidden = false
      cameraButton.textContent = "Desativar Câmera"
      isWebcamActive = true

      // Esconder o placeholder e a prévia quando a câmera estiver ativa
      placeholderDiv.hidden = true
      preview.hidden = true
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error)
      alert("Não foi possível acessar a câmera. Verifique as permissões do navegador.")
    }
  } else {
    // Parar todos os streams de vídeo
    const tracks = webcam.srcObject.getTracks()
    tracks.forEach((track) => track.stop())
    webcam.srcObject = null
    webcam.hidden = true
    captureButton.hidden = true
    cameraButton.textContent = "Usar Câmera"
    isWebcamActive = false

    // Mostrar o placeholder se não houver imagem
    if (preview.src === "" || preview.src === window.location.href) {
      placeholderDiv.hidden = false
      preview.hidden = true
    }
  }
}

// Capturar imagem da webcam
function captureImage() {
  ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height)
  const imageData = canvas.toDataURL("image/jpeg")
  preview.src = imageData
  preview.hidden = false
  placeholderDiv.hidden = true
  classifyBtn.disabled = false
}

// Classificar a imagem
async function classifyImage() {
  try {
    // Mostrar que está processando
    classifyBtn.disabled = true
    classifyBtn.textContent = "Processando..."

    // Garantir que a imagem está carregada no canvas
    if (preview.complete && preview.naturalHeight !== 0) {
      ctx.drawImage(preview, 0, 0, canvas.width, canvas.height)
    } else {
      throw new Error("Imagem não carregada corretamente")
    }

    // Fazer a previsão
    const predictions = await model.predict(canvas)
    console.log("Predições:", predictions)

    // Mostrar resultados
    displayResults(predictions)

    // Habilitar o botão novamente
    classifyBtn.disabled = false
    classifyBtn.textContent = "Classificar"
  } catch (error) {
    console.error("Erro ao classificar a imagem:", error)
    alert("Ocorreu um erro ao classificar a imagem. Verifique o console para mais detalhes.")
    classifyBtn.disabled = false
    classifyBtn.textContent = "Classificar"
  }
}

// Exibir os resultados da classificação
function displayResults(predictions) {
  // Ordenar predições por probabilidade (maior para menor)
  predictions.sort((a, b) => b.probability - a.probability)

  // Exibir a principal previsão
  const topPrediction = predictions[0]
  const materialName = getPortugueseName(topPrediction.className)
  topResult.textContent = materialName
  confidence.textContent = `Confiança: ${(topPrediction.probability * 100).toFixed(2)}%`

  // Preencher a descrição do material
  materialDescription.textContent = materialInfo[topPrediction.className].descricao

  // Limpar e preencher a lista de todas as predições
  predictionList.innerHTML = ""
  predictions.forEach((prediction) => {
    const percentage = (prediction.probability * 100).toFixed(1)
    const ptName = getPortugueseName(prediction.className)

    const predictionItem = document.createElement("div")
    predictionItem.className = "prediction-item"
    predictionItem.innerHTML = `
      <span class="material-name">${ptName}</span>
      <span class="material-percentage">${percentage}%</span>
    `
    predictionList.appendChild(predictionItem)
  })

  // Mostrar a seção de resultados
  resultsSection.hidden = false

  // Rolar para a seção de resultados
  resultsSection.scrollIntoView({ behavior: "smooth" })
}

// Obter nome em português a partir do nome da classe
function getPortugueseName(className) {
  return materialInfo[className]?.nome || className
}

// Inicializar após o carregamento da página
window.addEventListener("DOMContentLoaded", init)
