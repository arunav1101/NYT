// $(document).ready(function () {
    $('#clearBtn').on("click", function () {
        console.log("hello");
        $("#topArticles").empty();
        $('#searchTerm').val('');
        $('#startYear').val('');
        $('#endYear').val('');
        $('#pageSize').val('1');
    });
    $('#searchButton').on("click", function () {
        $("#topArticles").empty();

        var searchdata = $('#searchTerm').val() || '';

        // if (!($('#pageSize').val().match('/%d{4}' || '^$' ))) {
        //             alert("Page Size to Number Only");
        //         }
        //         else {
        var size = $('#pageSize').val() || '10';
        console.log($('#startYear').val());
        let a = $('#startYear').val();
        // if (!($('#startYear').val().match('/%d{4}/g'| "/^\s*$/gm" ))) {
        //     alert("Start year to be 4 digit Year")
        // } else {

        var sYear = $('#startYear').val() || '18000101';
        // if (!($('#endYear').val().match('/%d{4}/g'| "/^\s*$/gm" ))) {
        //     alert("End Year to be 4 digit Year");
        // } else {
        var eYear = $('#endYear').val() || '20190101';

        console.log('sYear', sYear);
        console.log('eYear', eYear);
        size = parseInt(size);

        ($('#startYear').val()) ? sYear = sYear.concat('0101'): sYear;
        ($('#endYear').val()) ? eYear = eYear.concat('0101'): eYear;

        var queryURL =
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchdata}&page=${size}&begin_date=${sYear}&end_date=${eYear}&api-key=Gfqh4Dx10e7aywA2KnPN7T8FzOvwqArS`

        console.log('SearchData: ', searchdata);
        console.log('Page Number:', size);
        console.log('Start year: ', sYear);
        console.log('End Year: ', eYear);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then((results) => {
            console.log(results.response.docs[0]);
            let i = 0;
            results.response.docs.forEach((element) => {
                i++;
                $("#topArticles")
                    .prepend(
                        `<div><p>${i}.${element.snippet}</p>
                       <p>Section : ${element.section_name}</p> 
                       <p>${element.pub_date}</p>
                       <a target="_blank" href =${element.web_url}>${element.web_url}</a></hr></div>`
                    );
            });
        // });


        // }}}
    });


});