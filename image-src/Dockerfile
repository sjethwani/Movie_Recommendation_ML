
#FROM python:3.7-alpine
#FROM jazzdd/alpine-flask:python3
FROM  amancevice/pandas:0.23.4-python3-alpine

ENV APPDIR /var/userapps

RUN mkdir $APPDIR

COPY app $APPDIR/
RUN chmod +x $APPDIR/runapp.sh
#RUN pip install flask
RUN pip3 install --upgrade pip
RUN pip3 install flask

#CMD ["python3", "-h"]
#CMD ["python3", "-m", "http.server", "80"]
#CMD ["FLASK_APP=recommendMovieFlask.py", "/usr/bin/flask", "run", "--host=0.0.0.0"]
#CMD ["/var/userapps/runapp.sh"]
CMD ["sh", "-c", "chmod +x /var/userapps/runapp.sh && /var/userapps/runapp.sh"]
#CMD ["chmod +x /var/userapps/runapp.sh && /var/userapps/runapp.sh"]


