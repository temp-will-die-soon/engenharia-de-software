describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')
      .type('Prova de Nossa Senhora{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.get('.todo-list li')
      .first()
      .should('have.class', 'completed');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.get('.todo-list li')
      .first()
      .should('not.have.class', 'completed');
  });

  it('Apaga todas as tarefas concluídas usando o botão clear-completed', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')
      .type('Prova de Nossa Senhora{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.get('.clear-completed').click();

    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Marca e desmarca todas as tarefas como concluídas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')
      .type('Prova de Nossa Senhora{enter}');

    cy.get('.toggle-all-label').click();

    cy.get('.todo-list li')
      .should('have.class', 'completed');

    cy.get('.toggle-all-label').click();

    cy.get('.todo-list li')
      .should('not.have.class', 'completed');
  });
});