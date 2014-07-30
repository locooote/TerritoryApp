<!DOCTYPE html>
<html data-ng-app="territoryApp">
<head>
    <title>Congregation Territory </title>
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/bootstrap-responsive.min.css" rel="stylesheet" />
    <link href="Content/datepicker3.css" rel="stylesheet" />
    <link href="Content/xeditable.css" rel="stylesheet">
    <link href="Content/appStyles.css" rel="stylesheet" />
</head>
<body>

    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <a class="brand " href="#/">
                    <img src="Content/Images/people.png" alt="logo"> Congregation Territory
                </a>
				<?php // echo 'PHP is here!'; ?>
                <ul class="nav nav-pills" data-ng-controller="NavbarController">
                    <li data-ng-class="{'active':getClass('/publishers')}"><a href="#/publishers">Publishers</a></li>
                    <li data-ng-class="{'active':getClass('/territories')}"><a href="#/territories">Territories</a></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Note that AngularJS 1.2+ now has a built-in ng-animation direction. Left in animated-view to show a 
         custom directive -->
    <div animated-view></div>


    <div id="footer">
        <div class="navbar navbar-fixed-bottom">
            <div class="navbar-inner">
                <div class="container">
                    <footer>
                        <div class="row">
							<div class="span4">
                                Congregation Territory Maps version 1.0 (2014)
                            </div>
							<!--
                            <div class="span4">
                                Created by Pierre Studios
                            </div>
                            <div class="span4">
                                Web: <a href="http://www.pierrestudios.com/">http://www.pierrestudios.com</a>
                            </div>
                            --> 
                        </div>
                   </footer>
                </div>
            </div>
        </div>
    </div>

    <!-- Vendor Libs: jQuery only used for Bootstrap functionality -->
    <script src="Scripts/angular.js"></script>
    <script src="Scripts/angular-route.js"></script>
    <script src="Scripts/jquery.min.js"></script>

    <!-- UI Libs -->
    <script src="Scripts/bootstrap.js"></script>
    <script src="Scripts/bootstrap-datepicker.js"></script>
    <script src="Scripts/angular-xeditable.js"></script>
    
    <!-- App -->
    <script>
        var site_url = "<?php echo $_SERVER['REQUEST_URI'] ?>";
    </script>
    <script src="app/app.js"></script>
    <script src="app/controllers/controllers.js"></script>
    <script src="app/services/territoriesService.js"></script>
    <script src="app/services/publishersService.js"></script>
    <script src="app/directives/animatedView.js"></script>
</body>
</html>