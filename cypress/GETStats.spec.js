describe('Players api', () => {
    context('GET /Stats', () => {
        it('Should return a list with all Stats', () => {
            cy.request({
                method: 'GET',
                url: ' https://www.balldontlie.io/api/v1/stats'
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))  //check array and check all response contain on id not null
                    expect(response.status).to.eq(200)
                    expect(response.body.data.length).to.be.eq(25);
                    assert.isArray(response.body.data, 'Todos Response is an array')
                    Cypress._.each(response.body.data, (data) => {
                        expect(data.id).to.not.be.null


                    })

                });
        });
        it('Then it should return all keys ', () => {
            cy.request({
                method: 'GET',
                url: ' https://www.balldontlie.io/api/v1/stats',


            })
                .should((response) => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body.data[0]))
                    expect(response.body.data[0].game).to.have.all.keys(
                        'id', 'date', 'home_team_id', 'home_team_score', 'period', 'postseason', 'season', 'status', 'time', 'visitor_team_id', 'visitor_team_score'
                    )
                });
        });

        it('Then it should return a specific player searching parameters from data stat', () => {
            cy.request({
                method: 'GET',
                url: ' https://www.balldontlie.io/api/v1/stats',

            })
                .should((response) => {
                    Cypress._.each(response.body.data, (data, i) => {
                        if ((response.body.data[i].fg3a === 3 && response.body.data[i].dreb === 1)) {  //search one specific player
                            cy.log(JSON.stringify(response.body.data[i]))
                            expect(response.body.data[i].game.period).to.eq(4)
                            expect(response.body.data[i].player.first_name).to.eq("Yogi")
                            expect(response.body.data[i].team.city).to.eq("Sacramento")

                        }
                    })


                });
        });


    });



});