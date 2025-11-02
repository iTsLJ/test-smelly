const { UserService } = require('../src/userService');

const dadosUsuarioPadrao = {
    nome: 'Fulano de Tal',
    email: 'fulano@teste.com',
    idade: 25,
};

describe('UserService - Suíte de Testes Limpos (sem smells)', () => {
    let userService;

    beforeEach(() => {
        userService = new UserService();
        userService._clearDB(); // Arrange comum: limpa o "banco" antes de cada teste
    });

    // ✅ Teste 1: Criação e busca de usuário (limpo e direto)
    test('deve criar um usuário e permitir sua busca por ID', () => {
        // Arrange
        const { nome, email, idade } = dadosUsuarioPadrao;

        // Act
        const usuarioCriado = userService.createUser(nome, email, idade);
        const usuarioBuscado = userService.getUserById(usuarioCriado.id);

        // Assert
        expect(usuarioCriado.id).toBeDefined();
        expect(usuarioBuscado.nome).toBe(nome);
        expect(usuarioBuscado.status).toBe('ativo');
    });

    // ✅ Teste 2: Desativar usuário comum
    test('deve desativar um usuário comum com sucesso', () => {
        // Arrange
        const usuario = userService.createUser('Comum', 'comum@teste.com', 30);

        // Act
        const resultado = userService.deactivateUser(usuario.id);
        const usuarioAtualizado = userService.getUserById(usuario.id);

        // Assert
        expect(resultado).toBe(true);
        expect(usuarioAtualizado.status).toBe('inativo');
    });

    // ✅ Teste 3: Não deve desativar um usuário administrador
    test('não deve desativar um usuário administrador', () => {
        // Arrange
        const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true);

        // Act
        const resultado = userService.deactivateUser(usuarioAdmin.id);
        const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);

        // Assert
        expect(resultado).toBe(false);
        expect(usuarioAtualizado.status).toBe('ativo');
    });

    // ✅ Teste 4: Gerar relatório de usuários
    test('deve gerar um relatório contendo os nomes e status dos usuários', () => {
        // Arrange
        const usuario1 = userService.createUser('Alice', 'alice@email.com', 28);
        userService.createUser('Bob', 'bob@email.com', 32);

        // Act
        const relatorio = userService.generateUserReport();

        // Assert
        // Em vez de verificar strings exatas, validamos o comportamento:
        expect(relatorio).toMatch(/Relatório de Usuários/);
        expect(relatorio).toContain(`Nome: ${usuario1.nome}`);
        expect(relatorio).toContain('Status: ativo');
    });

    // ✅ Teste 5: Exceção para menor de idade
    test('deve lançar erro ao tentar criar usuário menor de idade', () => {
        // Arrange
        const criarUsuarioMenor = () => userService.createUser('Menor', 'menor@email.com', 17);

        // Act + Assert
        expect(criarUsuarioMenor).toThrow('O usuário deve ser maior de idade.');
    });

    // ✅ Teste 6: Lista vazia quando não há usuários
    test('deve retornar uma lista vazia quando não houver usuários cadastrados', () => {
        // Arrange
        // Nenhum usuário criado

        // Act
        const relatorio = userService.generateUserReport();

        // Assert
        expect(relatorio).toContain('Nenhum usuário encontrado'); // ou conforme comportamento esperado
    });
});
