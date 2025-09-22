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
    validade30dias,
    quantidadeMenorQue
  } = req.query;
  let resultado = produtos;


  if (categoria) {
    resultado = resultado.filter(p => p.categoria.toLowerCase().includes(categoria.toLowerCase()));
  };
  if (fornecedor) {
    resultado = resultado.filter(p => p.fornecedor.toLowerCase().includes(fornecedor.toLowerCase()));
  };
  if (quantidadeMenorQue) {
    resultado = resultado.filter(p => p.quantidade < parseInt(quantidadeMenorQue));
  };

/*
  if (validade30dias) {
    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() + 30);

    resultado = resultado.filter(p => {
      const validade = new Date(p.dataValidade);
      return validade >= hoje && validade <= limite;
    });
  }
*/

  return res.status(200).json({
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
  };
  if (quantidade < 0) {
    res.status(400).json({
      success: false,
      message: `A quantidade não pode ser menor que 0!`,
    });
  };

  if (quantidade < 10) {
    res.status(400).json({
      success: false,
      message: `O estoque está com menos de 10 unidades!`
    })
  }

  const novoProduto = {
    id: produtos.length + 1,
    categoria,
    quantidade: parseInt(quantidade) || 0,
    precoUnitario: precoUnitario || parseFloat(precoUnitario),
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
  const {
    nomeProduto,
    categoria,
    quantidade,
    precoUnitario,
    fornecedor,
    dataValidade,
  } = req.body;
  const id = parseInt(req.params.id);
  const produtoExiste = produtos.find((p) => p.id === id);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: `Coloque um ID válido do tipo number!`,
    });
  };
  if (!produtoExiste) {
    return res.status(404).json({
      success: false,
      message: `Produto não existente com esse id ${id}`
    });
  };

  const produtoAtualizados = produtos.map(produto => produto.id === id
    ? {
      ...produto,
      ...(nomeProduto && { nomeProduto }),
      ...(categoria && { categoria }),
      ...(precoUnitario && { precoUnitario: parseFloat(precoUnitario) }),
      ...(fornecedor && { fornecedor }),
      ...(quantidade && { quantidade: parseInt(quantidade) }),
      ...(dataValidade && { dataValidade: new Date() })
    }
    : produto
  );
  produtos.splice(0, produtos.length, ...produtoAtualizados);
  const produtoEditado = produtos.find(p => p.id === id);

  return res.status(200).json({
    success: true,
    message: `Produto atualizado com sucesso!`,
    produto: produtoEditado
  });
};

const deleteProduto = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: `Coloque um ID válido do tipo number!`,
    });
  };
  const produtoRemover = produtos.find(p => p.id === id);
  if (!produtoRemover) {
    return res.status(404).json({
      success: false,
      message: `Esse produto não existe`
    });
  }
  const produtoFiltrado = produtos.filter(p => p.id !== id);
  produtos.splice(0, produtos.length, ...produtoFiltrado);
  return res.status(200).json({
    success: true,
    message: `Produto removido com sucesso!`
  });
};

export { getAllProdutos, getByIdProdutos, createProduto, updateProduto, deleteProduto };
