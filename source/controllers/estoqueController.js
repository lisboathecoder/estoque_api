import dados from "../models/dados.js";
const { produtos } = dados;

const getAllProdutos = (req, res) => {
  const {
    nomeProduto,
    categoria,
    quantidade,
    precoUnitario,
    fornecedor,
    dataValidade,
  } = req.query;
  let resultado = produtos;

  res.status(200).json({
    total: resultado.length,
    produtos: resultado,
  });
};

const getByIdProdutos = (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: `Coloque um ID válido do tipo number!`,
    });
  }
  if (produto) {
    res.status(200).json({
      success: true,
      produto: produto,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Produto não existente com esse id ${id}`,
    });
  }
};

const createProduto = (req, res) => {
  const {
    nomeProduto,
    categoria,
    quantidade,
    precoUnitario,
    fornecedor,
    dataValidade,
  } = req.body;
  if ((!nomeProduto, !categoria, !precoUnitario, !fornecedor)) {
    res.status(400).json({
      success: false,
      message: `Nome, categoria, preço e fornecedor são obrigátorios para um produto!`,
    });
  }
  if (quantidade < 0) {
    res.status(400).json({
      success: false,
      message: `A quantidade não pode ser menor que 0!`,
    });
  }

  const novoProduto = {
    id: produtos.length + 1,
    categoria,
    quantidade: quantidade || 0,
    precoUnitario,
    fornecedor,
    dataValidade: new Date(),
  };
  produtos.push(novoProduto);
   return res.status(201).json({
    success: true,
    message: `Novo produto criado!`,
  });
};

const updateProduto = (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: `Coloque um ID válido do tipo number!`,
    });
  };



};

export { getAllProdutos, getByIdProdutos, createProduto };
