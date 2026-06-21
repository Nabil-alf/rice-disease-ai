# train_model.py

import os
import pickle
import numpy as np

from PIL import Image

from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# =====================================================
# KONFIGURASI DATASET
# =====================================================

DATASET_PATH = "dataset"

IMAGE_SIZE = (128, 128)

MODEL_FILE = "model.pkl"

# =====================================================
# LABEL KELAS
# =====================================================

LABELS = {
    "berat": "Berat",
    "sedang": "Sedang",
    "sehat-ringan": "Sehat-Ringan"
}

# =====================================================
# MEMBACA DAN MEMPROSES GAMBAR
# =====================================================

def load_dataset():

    X = []
    y = []

    print("\nMemuat dataset...")

    for folder_name in os.listdir(DATASET_PATH):

        folder_path = os.path.join(
            DATASET_PATH,
            folder_name
        )

        if not os.path.isdir(folder_path):
            continue

        print(f"Memproses kelas: {folder_name}")

        for file_name in os.listdir(folder_path):

            image_path = os.path.join(
                folder_path,
                file_name
            )

            try:

                image = Image.open(image_path)

                image = image.convert("RGB")

                image = image.resize(
                    IMAGE_SIZE
                )

                image_array = np.array(
                    image
                )

                image_array = (
                    image_array / 255.0
                )

                image_array = image_array.flatten()

                X.append(image_array)

                y.append(
                    LABELS.get(
                        folder_name,
                        folder_name
                    )
                )

            except Exception as e:

                print(
                    f"Gagal membaca {image_path}"
                )

                print(e)

    return np.array(X), np.array(y)

# =====================================================
# LOAD DATASET
# =====================================================

X, y = load_dataset()

print("\nJumlah Dataset:", len(X))

print("Jumlah Label:", len(y))

# =====================================================
# SPLIT DATA TRAINING DAN TESTING
# =====================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nData Training :", len(X_train))
print("Data Testing  :", len(X_test))

# =====================================================
# MEMBUAT MODEL
# =====================================================

print("\nMelatih model Naive Bayes...")

model = GaussianNB()

model.fit(
    X_train,
    y_train
)

print("Training selesai.")

# =====================================================
# PREDIKSI TEST DATA
# =====================================================

y_pred = model.predict(
    X_test
)

# =====================================================
# EVALUASI MODEL
# =====================================================

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\n===================================")
print("HASIL EVALUASI MODEL")
print("===================================")

print(
    f"Akurasi: {accuracy * 100:.2f}%"
)

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        y_pred
    )
)

print("\nConfusion Matrix:\n")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)

# =====================================================
# SIMPAN MODEL
# =====================================================

with open(
    MODEL_FILE,
    "wb"
) as file:

    pickle.dump(
        model,
        file
    )

print(
    f"\nModel berhasil disimpan: {MODEL_FILE}"
)