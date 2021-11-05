describe('Blog app', function() {
  // before(function() {
  //   cy.request('POST', 'http://localhost:3003/api/testing/reset')
  //   const user = {
  //     name: 'forest',
  //     username: 'forestschwrtz',
  //     password: 'atlas'
  //   }
  //   cy.request('POST', 'http://localhost:3003/api/users/', user)
  //   cy.visit('http://localhost:3000')
  // })

  it('Login form is shown', function() {
    cy.contains('login')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('forestschwrtz')
      cy.get('#password').type('atlas')
      cy.get('#login-button').click()
      cy.contains('User Succesffuly Logged In')
      cy.get('#logout-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong user name')
      cy.get('#password').type('atlas')
      cy.get('#login-button').click()
      cy.contains('User Login was unsuccessful')
    })
  })


  describe('When logged in', function() {
    before(function() {
      cy.login({ username: 'forestschwrtz', password: 'atlas' })
    })

    it('A blog can be created', function() {
      cy.visit('http://localhost:3000')
      cy.get('#toggable-button').click()
      cy.get('#blog-title').type('test title')
      cy.get('#blog-author').type('test author')
      cy.get('#blog-url').type('test url')
      cy.get('#create-blog').click()
      cy.contains('test title')
    })

    it('A blog can be liked', function() {
      cy.get('#view-blog').click()
      cy.get('#like-blog').click()
      cy.get('#num-of-likes').contains('1')
    })

    it('A blog can be deleted', function(){
      cy.get('#delete-blog').click()
      cy.get('#blogs-list').should('be.empty')
      // cy.get('.blog-class').should('have.length',0)

    })
  })

  describe.only('Testing blogs are ordered correctly', function(){
    beforeEach(function(){
      cy.cleardb()
      cy.seeddb()
      cy.login({ username: 'forestschwrtz', password: 'Bosque77' })
      cy.visit('http://localhost:3000')
    })

    it('testing seed db', function(){
      cy.visit('http://localhost:3000')
      cy.get('.num-of-likes').then( elements => {

        let likes_array = elements.map((i,el) => {
          let el_likes = parseInt(el.textContent)
          return el_likes
        })

        let num_of_el = likes_array.length

        let truth_statement = true

        for(let i=0;i<num_of_el-1;i++){
          let current_num_of_likes = likes_array[i]
          let next_num_of_likes = likes_array[i+1]
          if(current_num_of_likes < next_num_of_likes){
            truth_statement = false
          }
        }

        expect(truth_statement).to.eq(true)
      })
    })
  })

})


