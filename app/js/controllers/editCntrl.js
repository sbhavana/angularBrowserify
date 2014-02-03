'use strict';

module.exports = function ( $scope, $location, $routeParams, socket ) {

    var Cntrl = {};
    $scope.Cntrl = Cntrl;

    // get user from the server
    socket.emit ( 'getUser', { _id: $routeParams.userId },  function ( err, data ) {

        if ( err ) {

            console.log ( err );
        }

        else {

            console.log ( "getUser callback: ", data );
            Cntrl.user = data;
        }
    });

    Cntrl.save = function () {

        // send the updated user details to the server to add
        socket.emit ( 'updateUser', Cntrl.user,  function ( err ) {

            if ( err ) {

                console.log ( err );
            }

            else {

                console.log ( "updateUser callback" );
                $location.path('/');
            }
        });
    };

    Cntrl.destroy = function () {

        // send the user details to the server to delete
        socket.emit ( 'deleteUser', Cntrl.user, function ( err ) {

            if ( err ) {

                console.log ( err );
            }

            else {

                console.log ( "deleteUser callback" );
                $location.path('/');
            }
        });
    };
};
