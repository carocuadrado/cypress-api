describe('Players api', () => {
    context('GET /Games', () => {
        it('Should return a list with all Games', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/games'
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(200)
                    expect(response.body.data.length).to.be.eq(25);
                    assert.isArray(response.body.data, 'Todos Response is an array') //check the data is one array
                    Cypress._.each(response.body.data, (data) => {  //check parameters contain value
                        expect(data.id).to.not.be.null
                        expect(data.date).to.not.be.null
                        expect(data.home_team_score).to.not.be.null
                        expect(data.season).to.not.be.null
                        expect(data.period).to.not.be.null
                        expect(data.status).to.not.be.null
                        expect(data.time).to.not.be.null
                        expect(data.postseason).to.not.be.null


                    })

                });
        });


        it('Search a specific game ', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/games',

            })
                .should((response) => {
                    Cypress._.each(response.body.data, (data, i) => {     //searching in the response of array one specific game with one specific id
                        cy.log(JSON.stringify(response.body.data[i].id))
                        if ((response.body.data[i].id === 48762)) {
                            cy.log(JSON.stringify(response.body.data[i].id))
                            expect(response.body.data[i].home_team.city).to.eq("Detroit")

                        }
                    })


                });
        });

        it('Then it should return games with season 2018', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/games',
                qs: {
                    season: 2018
                }
            })
                .should((response) => {                                                 // show all the games with season 2018
                    expect(response.status).to.eq(200)
                    Cypress._.each(response.body.data, (data, i) => {
                        if ((response.body.data[i].season === 2018)) {
                            cy.log(JSON.stringify(response.body))
                            expect(response.body.data[i].season).to.eq(2018)

                        }
                    })
                });
        });
    });


    context('GET /Specific Game', () => {
        it('Should return a specific Game', () => {
            cy.request({
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/games/1'    //check parameteres in one specific game into url
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(200)
                    expect(response.body.id).to.be.eq(1);
                    expect(response.body.date).to.not.be.null;
                    expect(response.body.home_team_score).to.be.eq(105);
                    expect(response.body.visitor_team_score).to.be.eq(87);
                    expect(response.body.season).to.be.eq(2018);
                    expect(response.body.period).to.be.eq(4);
                    expect(response.body.status).to.be.eq('Final');
                    expect(response.body.postseason).to.be.eq(false);
                    expect(response.body.home_team).to.have.all.keys(
                        'id', 'abbreviation', 'city', 'conference', 'division', 'full_name', 'name'
                    )
                    expect(response.body.visitor_team).to.have.all.keys(
                        'id', 'abbreviation', 'city', 'conference', 'division', 'full_name', 'name'
                    )
                });
        });
    });


});