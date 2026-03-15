from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///todo.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "secretkey"

db = SQLAlchemy(app)

class Transactions(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(200), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    description = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(200), nullable=False)
    def __repr__(self) -> str:
        return f"{self.sno} - {self.description}"
    def to_dict(self):
        return {
        "sno": self.sno,
        "type": self.type,
        "amount": self.amount,
        "description": self.description,
        "category": self.category,
        "status": self.status,
        "date": self.date.isoformat() if self.date else None
    }

@app.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Transactions.query.all()
    return [t.to_dict() for t in transactions]

@app.route("/transactions", methods=["POST"])
def add_transaction():
    data = request.json
    transaction = Transactions(type=data['type'], amount=data['amount'], description=data['description'], category=data['category'], status=data.get('status', 'pending'), date=datetime.fromisoformat(data['date']) if data.get('date') else datetime.utcnow())
    db.session.add(transaction)
    db.session.commit()
    return jsonify({'status': True})


@app.route("/transactions/<int:sno>", methods=["PUT"])
def update_transaction(sno):
    transaction = Transactions.query.get_or_404(sno)
    data = request.json
    transaction.type = data.get('type', transaction.type)
    transaction.amount = data.get('amount', transaction.amount)
    transaction.description = data.get('description', transaction.description)
    transaction.category = data.get('category', transaction.category)
    transaction.status = data.get('status', transaction.status)
    if data.get('date'):
        transaction.date = datetime.fromisoformat(data['date'])
    db.session.commit()
    return jsonify({'status': True})


if __name__ == "__main__":
    app.run(debug=True)