describe('Players api', () => {
    context('GET /Teams', () => {
        it('should return a list with all Teams', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/teams'
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))    //checking array and parameters not null
                    expect(response.status).to.eq(200)
                    expect(response.body.data.length).to.be.eq(30);
                    assert.isArray(response.body.data, 'Todos Response is an array')
                    Cypress._.each(response.body.data, (data) => {
                        expect(data.id).to.not.be.null
                        expect(data.abbreviation).to.not.be.null
                        expect(data.city).to.not.be.null
                        expect(data.conference).to.not.be.null
                        expect(data.division).to.not.be.null
                        expect(data.full_name).to.not.be.null
                        expect(data.name).to.not.be.null

                      })
                  
                    expect(response.body.meta).to.have.all.keys(
                      'total_pages', 'current_page', 'next_page', 'per_page', 'total_count'
                    )
                });
        });
    });

    context('GET /Specific Team', () => {
        it('should return a specific Team', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/players/14'
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(200)
                    expect(response.body.id).to.be.eq(14);
                    expect(response.body.abbreviation).to.not.be.null;
                    expect(response.body.city).to.not.be.null;
                    expect(response.body.conference).to.not.be.null;
                    expect(response.body.division).to.not.be.null;
                    expect(response.body.full_name).to.not.be.null;
                    expect(response.body.name).to.not.be.null;
                    expect(response.body.team).to.have.all.keys(
                        'id', 'abbreviation', 'city', 'conference', 'division','full_name','name'
                      )
                      
                });
        });
    });


});