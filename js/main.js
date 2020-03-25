const baseUrl = 'http://34.89.235.203:8000';


async function requestData(api) {
  return fetch(baseUrl + api,
    {
      headers: new Headers({
        'Authorization': 'Token 9e95f7659826ba81de37250f40feac02bd992ac5'
      })
    });
}

async function fetchQuestions() {
  try {
    const response = await requestData(
      '/api/v1/questions/questions/');
    const responseJson = await response.json();
    console.log(responseJson)
    return await responseJson
  } catch (e) {
    console.error(e);
  }
}

async function fetchAnswers(projectId) {
  try {
    const response = await requestData(
      '/api/v1/projects/projects/' + projectId + '/values/');
    const responseJson = await response.json();
    console.log(responseJson)
    return await responseJson
  } catch (e) {
    console.error(e);
  }
}

async function mergeQuestionsAndAnswers(projectId){
 const questions = await fetchQuestions();
 const answers = await fetchAnswers(projectId);
 let questionAnswer = {};
 questions.forEach(question => questionAnswer[question.attribute] = question );
 answers.forEach(answers => answers.question = questionAnswer[answers.attribute]);
  createTable(answers);
}
function updateButton(){
  mergeQuestionsAndAnswers($('#projectidnumber').val());
}

$(document).ready(function () {
  $('#submitbutton').click(updateButton);
  mergeQuestionsAndAnswers($('#projectidnumber').val());
})



function createTable(data){
  if($.fn.dataTable.isDataTable( '#example' )) {
    $('#example').DataTable().destroy();
  }
  $('#example').DataTable( {
    buttons: [
      {
        text: 'csv',
        extend: 'csvHtml5',
        fieldSeparator: ';',
        extension: '.csv',
        title: "data_export"
      }
    ],

    data: data,
    dom: 'Bfrtip',
    columns: [
      { data: 'id', title: 'id'  },
      { data : 'attribute', title: 'attribute'},
      { data: 'question.text_de', title: 'question text_de', defaultContent: "<i>n/a</i>"},
      { data: 'text', title: 'response text', defaultContent: "<i> </i>"},
      { data: 'option', title: 'response option', defaultContent: "<i> </i>"}
    ]
  } );
}

// 9e95f7659826ba81de37250f40feac02bd992ac5

