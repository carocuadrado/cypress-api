describe('Players api', () => {
    context('GET /players', () => {
        it('should return a list with all players', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/players'
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))  // return results response body of 25 players
                    expect(response.status).to.eq(200) // check response is 200
                    expect(response.body.data.length).to.be.eq(25); // check lengh of array data is 25 
                    expect(response.body.meta).to.have.all.keys(               //check all keys in meta
                      'total_pages', 'current_page', 'next_page', 'per_page', 'total_count'
                    )
                });
        });
    });

    context('GET /Specific player', () => {
        it('should return a specific player', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/players/237'
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(200)                        //check status OK 200
                    expect(response.body.id).to.be.eq(237);
                    expect(response.body.first_name).to.not.be.null;   /* check all parameters contain value not null*/
                    expect(response.body.last_name).to.not.be.null;
                    expect(response.body.position).to.not.be.null;
                    expect(response.body.height_feet).to.not.be.null;
                    expect(response.body.height_inches).to.not.be.null;
                    expect(response.body.weight_pounds).to.not.be.null;
                    expect(response.body.team).to.have.all.keys(
                        'id', 'abbreviation', 'city', 'conference', 'division','full_name','name'
                      )
                      
                });
        });
    });


});