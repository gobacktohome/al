import pandas as pd
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from sklearn import preprocessing

# 데이터 불러오기
data = pd.read_excel('CustomerDataSet2.xls')

# 데이터 몇 행만 보기
print(data.head())

# 데이터 전처리 - NaN 값 처리
data.fillna(data.mean(), inplace=True)

# 원본 데이터를 복사해서 전처리하기 (원본 데이터를 가지고 바로 전처리하지 않는다)
processed_data = data.copy()

# 데이터 전처리 - 정규화를 위한 작업
scaler = preprocessing.MinMaxScaler()
processed_data[['Purchase', 'Refund']] = scaler.fit_transform(processed_data[['Purchase', 'Refund']])

# 화면(figure) 생성
plt.figure(figsize=(10, 6))

# K 값을 늘려가며 반복 테스트
for i in range(1, 7):
    # 클러스터 생성
    estimator = KMeans(n_clusters=i)
    ids = estimator.fit_predict(processed_data[['Purchase', 'Refund']])
    # 2행 3열을 가진 서브플롯 추가 (인덱스 = i)
    plt.subplot(3, 2, i)
    plt.tight_layout()
    # 서브플롯의 라벨링
    plt.title("K value = {}".format(i))
    plt.xlabel('Purchase')
    plt.ylabel('Refund')
    # 클러스터링 그리기
    plt.scatter(processed_data['Purchase'], processed_data['Refund'], c=ids)

plt.show()

# K = 3으로 클러스터링
estimator = KMeans(n_clusters=3)

# 클러스터링 생성
cluster_ids = estimator.fit_predict(processed_data[['Purchase', 'Refund']])

# create a scatter plot
plt.scatter(processed_data['Purchase'], processed_data['Refund'], c=cluster_ids)

# 제품과 클러스터 id로 데이터에 범례 달기
for index, row in processed_data.iterrows():
    plt.annotate("Clu{}: {}".format(cluster_ids[index], row['Product ID']),
                 (row['Purchase'], row['Refund']))

plt.xlabel('Purchase')
plt.ylabel('Refund')
plt.show()

# 클러스터 1로 분류된 데이터를 추출해보자
cluster_1_data = data[cluster_ids == 1]
print(cluster_1_data)

# 플로팅하기
plt.scatter(data['Purchase'], data['Refund'], c=cluster_ids)

# 우편번호로 범례달기
for index, row in data.iterrows():
    plt.annotate(row['ZipCode'], (row['Purchase'] + 0.6, row['Refund'] + 0.6))

plt.xlabel('Purchase')
plt.ylabel('Refund')
plt.show()
