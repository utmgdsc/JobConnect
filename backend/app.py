from flask import Flask, request, jsonify
from pymongo import MongoClient
from sklearn.neighbors import KNeighborsClassifier
from nltk import FreqDist
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import abort
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
import os
load_dotenv()

app = Flask(__name__)
CORS(app)
# Initialize MongoDB client and get the necessary collections
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client['test']
job_postings_collection = db['job_postings']
job_seekers_collection = db['job_seekers']

# Initialize TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer()

def preprocess_text(text):
    # Preprocess the text
    tokens = FreqDist(text.split())
    return list(tfidf_vectorizer.fit_transform(tokens).toarray()[0])

def preprocess_details(details):
    all_text = f"{details['description']} {details['responsibilities']} {details['requirements']} {details['benefits']}"
    return preprocess_text(all_text)

def preprocess_job_posting(job_posting):
    text = f"{job_posting['details']['description']} {job_posting['jobTitle']} {job_posting['jobType']} {job_posting['location']}"
    return preprocess_text(text)

def preprocess_job_seeker(a, b, c, d):
    # Combine skills and job preferences
    text = f"{a} {b} {c} {d}"
    return preprocess_text(text)

@app.route('/recommend', methods=['GET'])
@cross_origin(origin='*')
def recommend():
    print("0")
    job_preferences = request.args.get('jobPreferences')
    desired_industry = job_preferences.get('desiredIndustry')
    job_type = job_preferences.get('jobType')
    location = request.args.get('location').get('city')
    skills = request.args.get('professionalProfile').get('skills')
  
    # Retrieve all job postings
    all_job_postings = list(job_postings_collection.find({}))
    preprocessed_job_postings = [preprocess_job_posting(job_posting) for job_posting in all_job_postings]
    # Preprocess the job seeker data
    preprocessed_job_seeker = preprocess_job_seeker(desired_industry, location, skills, job_type)

    # Set up KNN model with k=1
    knn = KNeighborsClassifier(n_neighbors=1)
    knn.fit(preprocessed_job_postings, list(range(len(all_job_postings))))
    distances, indices = knn.kneighbors([preprocessed_job_seeker], n_neighbors=5)
    print(distances)
    print(indices)
    # Predict the nearest job postings for the job seeker
    top5_matching_jobs = [all_job_postings[idx] for idx in indices]
    # for i in range(5):
    #     nearest_neighbor_index = knn.predict([preprocessed_job_seeker])[0]
        
    #     nearest_job_posting = all_job_postings[nearest_neighbor_index]

    #     # Add the nearest job posting to the result array
    #     top5_matching_jobs.append(nearest_job_posting)

    #     # Remove the nearest neighbor from the job postings and preprocessed data
    #     all_job_postings.pop(nearest_neighbor_index)
    #     preprocessed_job_postings.pop(nearest_neighbor_index)

    #     # Refit the KNN model
    #     knn.fit(preprocessed_job_postings, list(range(len(all_job_postings))))

    return jsonify(top5_matching_jobs)

if __name__ == '__main__':
    app.run()
