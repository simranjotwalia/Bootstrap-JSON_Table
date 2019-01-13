var renderTableJSON = function(jsonData, vocabGroupJson){
    var tableJSON =jsonData;
    var tablePlaceholder = $('#words-table > tbody:last-child');
    var rows =[];

    var wordGroupObject = {};
    for (var key in vocabGroupJson){
        wordGroupObject[vocabGroupJson[key].vocabGroupID] = vocabGroupJson[key].vocabGroupName;
        }
   
    var tableCaption = '';
    var captionElement = $('#table-cap');
    var wordGroupId = tableJSON.words[0].vocabGroupID;
    var wordGroupName = wordGroupObject[wordGroupId];
    tableCaption =  wordGroupName + ': '+ tableJSON.notes;
    $(captionElement).text(tableCaption);

    var wordsArray = tableJSON.words;
    for(var i=0; i < wordsArray.length ; i++){
        wordObj = wordsArray[i];
        var data ={};
            data.rowNumber = i+1;
            data.word = wordObj.word;
            data.wordMeaning = wordObj.meaning;
            data.exampleSentence = wordObj.example;
        var compiledTemplate = Handlebars.templates['table-row-template'];
        var htmlString = compiledTemplate(data);
        tablePlaceholder.append(htmlString);
    }

};

//Compiling the template and making it ready so that it can be used anywhere. 
//Template would be compiled when above JS is executed
(function ($) {

    var source = $("#table_row").html();
    var template = Handlebars.compile(source); // this returns IIFE
    if (Handlebars.templates === undefined) {
        Handlebars.templates = {};
    }
    Handlebars.templates['table-row-template'] = template;  

})(window.jQuery);

