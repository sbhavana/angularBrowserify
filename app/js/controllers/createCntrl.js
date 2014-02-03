'use strict';

module.exports = function ( $scope, $location, socket ) {

    var Cntrl = {};
    $scope.Cntrl = Cntrl;

    Cntrl.save = function () {

        // send the new user details to the server to add
        socket.emit ( 'addNewUser', Cntrl.user,  function ( err ) {

            if ( err ) {

                console.log ( err );
            }

            else {

                console.log ( "addNewUser callback" );
                $location.path('/');
            }
        });
    };
};
