$('#clearBtn').on("click", function () {
    $("#topArticles").empty();
    $('#searchTerm').val('');
    $('#startYear').val('');
    $('#endYear').val('');
    $('#pageSize').val('1');
});

$('#searchButton').on("click", function () {
    let validateYear = false;
    $("#topArticles").empty();

    validateYear = $('#searchTerm').val().match(/^$/g);

    if (validateYear) alert("Search Criteria is mandate");
    else {
        var searchdata = $('#searchTerm').val() || '';
        var size = $('#pageSize').val();
        validateYear = $('#startYear').val().match(/[0-9]{4}/g) || $('#startYear').val().match(/^$/g);

        if (!validateYear || $('#startYear').val().length >4) alert("Enter 4 digit StartYear ");
        else {
            var sYear = $('#startYear').val() || '18000101';
            validateYear = $('#endYear').val().match(/[0-9]{4}/g) || $('#endYear').val().match(/^$/g);

            if (!validateYear || $('#endYear').val().length >4) alert("Enter 4 digit End year");
            else {
                var eYear = $('#endYear').val() || '20190101';
                size = parseInt(size);
                if (eYear < sYear) alert('End year should be greater than Start Year');
                else {

                    ($('#startYear').val()) ? sYear = sYear.concat('0101'): sYear;
                    ($('#endYear').val()) ? eYear = eYear.concat('0101'): eYear;

                    var url =
                        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchdata}&page=${size}&begin_date=${sYear}&end_date=${eYear}&api-key=Gfqh4Dx10e7aywA2KnPN7T8FzOvwqArS`;
                    $.ajax({
                        url,
                        method: "GET"
                    }).then((results) => {
                        let i = 0;
                        results.response.docs.forEach((element) => {
                            i++;
                            $("#topArticles")
                                .append(
                                    `<div><p>${i}.${element.snippet}</p>
                       <p>Section : ${element.section_name}</p> 
                       <p>${element.pub_date}</p>
                       <a target="_blank" href =${element.web_url}>${element.web_url}</a></hr></div>`
                                );
                        });
                    });
                }
            }
        }
    }
});