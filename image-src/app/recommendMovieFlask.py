import os

import pandas as pd
import numpy as np
import json

from flask import Flask
from flask import jsonify
from flask import request
from flask import make_response
from flask import url_for
from flask import render_template

app = Flask(__name__, static_folder='public', static_url_path='')



#################################################
# Route Setup
#################################################

#Return the homepage
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dataset")
def dataset():
    return render_template("dataset.html")

@app.route("/api")
def welcomeApi():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/watched/user/<user_id><br/>"
        f"/api/recommended/user/<user_id><br/>"
        f"/api/movie_summary<br/>"
        )

#Return data summary group by user_id
@app.route("/api/watched/user/<user_id>")
def watched_summary(user_id):

    user_df = pd.read_csv("./ml-latest-small/ratings.csv",sep=',',encoding='utf-8')
    movie_df = pd.read_csv("./ml-latest-small/movies.csv",sep=',',encoding='latin-1')

    user_df = user_df[['userId','movieId','rating']]
    movie_df = movie_df[['movieId','tmdbId','tmdbposter','genres','title']]

    #convertion from string to numeric for calculation
    user_df['userId'] = pd.to_numeric(user_df['userId'])
    user_df['movieId'] = pd.to_numeric(user_df['movieId'])
    user_df['rating'] = pd.to_numeric(user_df['rating'])

    #filter by user_id and rating
    summary_user_df = user_df.loc[(user_df['userId'] == int(user_id)) & (user_df['rating'] > 4)]

    summary_user_df = pd.merge(summary_user_df, movie_df, on='movieId', how='inner')
    
    #reset index
    summary_user_df = summary_user_df.reset_index()

    #jsonify dataframe
    summary_user_json = json.loads(summary_user_df.to_json(orient='records'))

    #return with json format data for api
    return jsonify(summary_user_json)


#Return data summary group by user_id
@app.route("/api/recommended/user/<user_id>")
def recommended_summary(user_id):

    user_df = pd.read_csv("./ml-latest-small/predicted_ratings_final.csv",sep='\t',encoding='latin-1')
    user_df = user_df[['userId','movieId','rating','movieName','movieGenre','tmdbId','moviePoster']]
    
    #convertion from string to numeric for calculation
    user_df['userId'] = pd.to_numeric(user_df['userId'])
    user_df['movieId'] = pd.to_numeric(user_df['movieId'])
    user_df['rating'] = pd.to_numeric(user_df['rating'])
    
    user_df['tmdbId'] = pd.to_numeric(user_df['tmdbId'],downcast='signed')

    #store mean and total into dataframe
    summary_user_df = user_df.loc[(user_df['userId'] == int(user_id)) & (user_df['rating'] > 4)]

    #reset index
    summary_user_df = summary_user_df.reset_index()

    #jsonify dataframe
    summary_user_json = json.loads(summary_user_df.to_json(orient='records'))

    #return with json format data for api
    return jsonify(summary_user_json)


#################################################
# End of Route setup
#################################################

if __name__ == "__main__":
    app.run(debug=True)

