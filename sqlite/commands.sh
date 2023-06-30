#insert into database
sqlite3 myparts.db <<EOF
insert into parts (NAME,REMAINING,LOCATION,PICTURE_LINK) values('yellow_LED',10,'C1','images/IMG_8661.jpeg');
EOF
#select
sqlite3 myparts.db <<EOF
select * from parts where location='C1';
EOF