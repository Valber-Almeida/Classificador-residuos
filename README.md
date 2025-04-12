# ♻️ Classificador de Resíduos

Aplicação web interativa para **classificação de resíduos** com uso de **inteligência artificial**, desenvolvida com **TensorFlow.js**. Através de imagens, o sistema identifica diferentes tipos de materiais, promovendo o **descarte consciente e ambientalmente correto**.


"Mesmo a menor pessoa pode mudar o curso do futuro."

— Galadriel, O Senhor dos Anéis: A Sociedade do Anel

---

## 🚀 Funcionalidades

- 📷 Upload de imagens e captura via câmera
- 🧠 Classificação em tempo real com modelo pré-treinado
- 📊 Exibição de porcentagens de confiança para cada categoria
- 🗑️ Orientações sobre o descarte ideal de cada material

---

## 🧪 Materiais Reconhecidos

O modelo é capaz de identificar os seguintes tipos de resíduos:

- Baterias
- Resíduos biológicos/orgânicos
- Vidro marrom
- Papelão
- Roupas
- Vidro verde
- Metal
- Papel
- Plástico
- Calçados
- Lixo comum
- Vidro transparente

---

## 🛠️ Tecnologias Utilizadas

- HTML5, CSS3 e JavaScript
- [TensorFlow.js](https://www.tensorflow.org/js) para execução do modelo no navegador
- [Teachable Machine](https://teachablemachine.withgoogle.com/) para o treinamento do modelo

---

## 💻 Como Usar

1. Certifique-se de que todos os arquivos do projeto estão na mesma pasta:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `package.json`
   - `model.json`
   - `metadata.json`
   - `weights.bin`

2. Abra o arquivo `index.html` em um navegador moderno (como Chrome ou Firefox)

3. Carregue uma imagem **ou** use a câmera para capturar uma foto

4. Clique no botão **"Classificar"** e veja o resultado

> ⚠️ **Nota:** Para utilizar a câmera, é necessário abrir a aplicação por meio de um servidor local (por questões de segurança dos navegadores).

---

## 📁 Estrutura de Arquivos

```bash
classificador-residuos/

├── index.html          # Página principal da aplicação
├── styles.css          # Estilos da aplicação
├── script.js           # Lógica JavaScript
├── model.json          # Configuração do modelo
├── metadata.json       # Metadados do modelo
├── weights.bin         # Pesos do modelo
└── README.md           # Documentação do projeto
```

---

## 🧩 Solução de Problemas

Caso o modelo não carregue corretamente:

1. Verifique se todos os arquivos estão na pasta correta
2. Abra o console do navegador (F12) e observe possíveis erros
3. Certifique-se de que o navegador não está bloqueando scripts
4. Use um servidor local para evitar restrições de segurança

---

## 🌐 Instalação Local com Servidor

Execute um servidor local para garantir o funcionamento completo da aplicação:

```bash
# Usando Python 3
python -m http.server 8000

# Usando Python 2
python -m SimpleHTTPServer 8000

# Usando Node.js (requer http-server instalado)
npx http-server
```

Acesse no navegador: [http://localhost:8000](http://localhost:8000)

---

## 🤝 Contribuições

Contribuições são super bem-vindas! Você pode ajudar de diversas formas:

- 💡 Sugerir melhorias na interface
- ✨ Adicionar novas funcionalidades
- 🧠 Aprimorar o modelo de classificação
- 🐞 Corrigir bugs ou inconsistências

Abra uma *issue* ou envie um *pull request* — ficarei feliz em analisar!

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** — fique à vontade para usar, modificar e distribuir.

---


🎯 Desenvolvido por Valber
