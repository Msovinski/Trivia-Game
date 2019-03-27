$(document).ready(function(){
  
    
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: 'Who designed what was considered the world’s first car?',
      q2: 'What famous auto maker is responsible for designing the Volkswagen Beetle?',
      q3: 'How did the Ford Mustang get it’s name?',
      q4: 'What video game comes standard in every Saab equipped with a GM Tech II?',
      q5: "What tailgate accessory did the first and second generation Honda CRV’s come equipped with?",
      q6: 'What was the last automaker to offer cassette players in their vehicles? ',
      q7: "Bentley, Bugatti, Lamborghini and Porsche are auto manufacturers under what flagship company?"
    },
    options: {
      q1: ['Henry Ford', 'Ferdinand Porsche', 'Karl Benz', 'David Buick'],
      q2: ['Bavarian Motor Works', 'Walter P. Chrysler', 'Henry Ford', 'Ferdinand Porsche'],
      q3: ['Herd of Wild Horses', 'WWII Fighter Plane', 'Henry Ford’s Wife', 'Play on words for Horsepower'],
      q4: ['Tetris', 'Mario Kart', 'Centipede', 'Pong'],
      q5: ['Beverage Cooler','Tailgate Grill','Picnic Table','Porta-Potty'],
      q6: ['Ford','Lexus','Honda','Chevrolet'],
      q7: ['BMW', 'Jaguar', 'Volkswagen','Subaru']
    },
    answers: {
      q1: 'Karl Benz',
      q2: 'Ferdinand Porsche',
      q3: 'WWII Fighter Plane',
      q4: 'Pong',
      q5: 'Picnic Table',
      q6: 'Ford',
      q7: 'Volkswagen'
    },
   
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      trivia.nextQuestion();
    },
     
    nextQuestion : function(){
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }

      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        $('#results')
          .html('<h3>Thanks for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>To try again click here</p>');
        $('#game').hide();
        $('#start').show();
      }
      
    },

    guessChecker : function() {
      var resultId;
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct!</h3>');
      }
     
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Incorrect! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
       
    }
  
  }