# Hướng dẫn setup comic database

| Mục lục                                                                                           |
| ------------------------------------------------------------------------------------------------- |
| [Hosting](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hosting)               |
| [Kết nối](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#kết-nối)               |
| [Mô tả dữ liệu](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#mô-tả-dữ-liệu)   |
| [Import dữ liệu](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#import-dữ-liệu) |
| [Lưu ý và kết](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#lưu-ý-và-kết)     |

## Hosting

### Tuỳ chọn 1: [MongoDB Atlas](https://www.mongodb.com/atlas/database)

**Ưu**

-   Miễn phí 500mb
-   Đọc / ghi không giới hạn

Bạn có thể xem hướng dẫn chi tiết trên [mongo3T](https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas) hoặc xem video hướng dẫn trên [youtube](https://youtu.be/vAHd7oV1uE0)

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

### Tuỳ chọn 2: [Railway](https://railway.app)

Railway chắc không cần phải hướng dẫn vì vào chỉ có click click thôi.

**Ưu**

-   Miễn phí 5Gb
-   Kết nối nhanh, ít thao tác setup (Tạo database xong có luôn cái uri để kết nối)

**Nhược**

-   Giới hạn thực thi 500 giờ => chỉ phù hợp để dùng cá nhân và demo

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

### Tuỳ chọn 3: [ScaleGrid](https://scalegrid.io)

ScaleGrid như Railway, vào chỉ có click click thôi.

**Ưu**

-   Miễn phí 25Gb
-   Miễn phí trong vòng 30 ngày không cần thẻ tín dụng
-   Kết nối nhanh (chọn cụm Singapore để kết nối nhanh nhất), ít thao tác setup (Tạo database xong có luôn cái uri để kết nối)

**Nhược**

-   Hết 30 ngày nhập thông tin thanh toán để tiếp tục dùng (đời mà, không làm sao có ăn).

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

## Kết nối

Sau khi đăng ký các dịch vụ hosting xong nhận được URI sẽ có dạng giống giống vầy:

```
mongodb+srv://<user-name>:<password>@cluster0.isar7.mongodb.net
```

Hoặc (tuỳ vào dịch vụ cung cấp)

```
mongodb://admin:<password>@SG-<your-cluster>-53224.servers.mongodirector.com:27017
```

-   Cài đặt [MongoDB Compass](https://www.mongodb.com/products/compass) nếu bạn ít thao tác với Mongo Shell (me too :U ) => Bỏ qua bước này nếu bạn dùng [Mongo3T](https://robomongo.org) hoặc [Mongo Shell](https://www.mongodb.com/docs/v4.4/mongo)
-   Dán URI ở trên vào chọn Connect => Giờ bạn có thể hoàn toàn thao tác với cở sở dữ liệu bằng giao diện
    ![mongo-compass](https://i.ibb.co/h9vssYw/Screenshot-2022-09-06-212430.png)

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

## Mô tả dữ liệu

-   Collections:

```
comics:

{
  _id: ObjectId;
  status: string;
  author: string;
  genres: [{
    _id: ObjectId;
    id: string;
    value: string;
    label: string;
  }];
  otherName: string;
  review: string;
  newChapter: string;
  thumbnail: string;
  name: string;
  updatedAt: string;
  slug: string;
  sourcesAvailable: [{
    sourceName: string;
    sourceSlug: string;
    _id: ObjectId;
  }]
  chapters: ObjectId
}

indexes: slug, name (unique)

```

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

```

chapters:

{
  _id: ObjectId;
  chapters_list: [{
    sourceName: string;
    chapters: [{
      _id: ObjectId
      chapterId: string;
      chapterSlug: string;
      chapterNumber: string;
      chapterTitle: string;
      updatedAt: string;
    }]
  }]
  comicName: string;
  comicSlug: string;
  createAt: Date;
  source: string;
}

indexes: comicName, comicSlug (unique)
```

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

```
descriptions:

{
  _id: ObjectId;
  name: string;
  characters: [{
    cover: string;
    mal_url: string;
    name: string;
    role: string;
  }]
  cover: string;
  description: string;
  mal_id: Number (Int32);
  pictures: [{
    _id: ObjectId;
    large: string;
    small: string;
  }];
  popularity: string;
  published: string;
  ranked: string;
  recommendations: [{
    _id: ObjectId;
    title: string;
    cover: string;
    coverFallback: string;
    url: string;
  }];
  score: string;
  titles: {
    title_synonyms: string;
    title_japanese: string;
    title_english: string;
  };
  createdAt: Date;
  slug: string;
}

```

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

```
pages:

{
  _id: ObjectId;
  chapter: ObjectId;
  chapterSlug: string;
  comicName: string;
  comicSlug: string;
  createdAt: Date;
  pages: [{
    _id: ObjectId;
    id: string;
    src: string;
    fallbackSrc: string;
  }]
  updatedAt: Date;
  source: string;
}
```

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

## Import dữ liệu

### Tuỳ chọn 1: Dành cho cơ sở dữ liệu không phải là MongoDB hoặc bạn muốn thiết kế lại document Schema

-   [Download](https://github.com/leephan2k1/manga-app/releases/download/database/db-backup-json.zip) file json của tất cả collection trên (Giải nén ra chắc cũng hơn 1Gb)
-   Giải nén ra gồm 4 file json tương ứng với 4 collections được mô tả bên trên
-   Thao tác đọc/ghi JSON bình thường với tất cả ngôn ngữ

### Tuỳ chọn 2: Import theo cách nông dân:

-   Sau khi kết nối thành công với MongoDB Compass bên trên:

1. Tạo cơ sở dữ liệu ( "+" Góc dưới trái của panel)
   ![create-db](https://i.ibb.co/Bryj94L/Screenshot-2022-09-06-220323.png)
2. Tạo 4 collections tương ứng: comics, chapters, descriptions, pages
3. Add data => import file => chọn json và import từng file json vào collection tương ứng:
   ![import-json](https://i.ibb.co/VVpQdhx/Screenshot-2022-09-06-220553.png)

### Tuỳ chọn 3: Sử dụng mongorestore

-   mogorestore là tool của MongoDB nên đảm bảo rằng bạn đã cài đặt nó: [Mongodb tools](https://www.mongodb.com/try/download/database-tools)
-   Kiểm tra trên Windows, đường dẫn mặc định

```
C:\Program Files\MongoDB\Server\<version>\bin
```

-   Các bạn dùng Linux với Mac chắc là pro player rồi không cần hướng dẫn 🐧 (Đùa, hơi lười và không dùng Mac)

Bao gồm 2 file quan trọng mongodump và mongorestore và các files liên quan:
![mongodb-tools](https://i.ibb.co/XCvSN6R/Screenshot-2022-09-06-221522.png)

-   Sau khi make sure các bước trên thì:

1. Tải file [database](https://github.com/leephan2k1/manga-app/releases/download/database/kyoto-manga-db.zip) trên github của mình.
2. Giải nén (Sẽ ra thư mục kyoto-manga-db, trong đó gồm các file bson và json)
3. Tắt tường lửa, mở cmd bằng quyền admin (cho chắc)
4. cd đến thư mục bin trong bên trên (Mình đang dùng phiên bản 6.0 nên nhớ kiểm tra đường dẫn)

```
cd C:\Program Files\MongoDB\Server\6.0\bin
```

5. Thực hiện lệnh:

```
mongorestore --uri=<your-uri> --authenticationDatabase=admin --db <your-db-name> --gzip <backup-file-path>
```

Ghi chú:

-   `<backup-file-path>` là đường dẫn đến các file bạn đã giải nén ở bước 2

-   Nếu database access của bạn không phải là admin (Lệnh trên khi mình dùng với ScaleGrid, Atlas sẽ là username hoặc gì đó), thì thay thế bằng:

```
--authenticationDatabase=<user-name>
```

-   Sau khi restore thành công sẽ có kết quả như sau:

![result](https://i.ibb.co/THfJ5CN/Screenshot-2022-09-08-205244.png)

-   Nếu vẫn còn lỗi thì bạn chịu khó xem video [này](https://www.youtube.com/watch?v=n2KfMatFy1Y) và video [này](https://youtu.be/GTwXLZlWdaw) và đọc trên doc của [mongodb](https://www.mongodb.com/docs/database-tools/mongorestore) nhé. Nếu vẫn không thành công thì chịu khó copy lỗi dán vào Google hoặc quay lại import theo tuỳ chọn 2 🐧

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)

## Lưu ý và kết

-   Dữ liệu trong collections chapters -> chapters_list -> element trong chapters -> updatedAt sẽ bị cũ vì nguồn Nettruyen count up thời gian (1 ngày trước, 1 tuần trước,...) => Chỉ đúng với những bộ trước năm hiện tại có thời gian xác định: 1/1/2021. Nên hiển thị dữ liệu này cần căng nhắc hoặc "Xác nhận" lại bên nguồn nettruyen.
-   descriptions của comic không phải bộ nào cũng có vì mình lấy bên Myanimelist. (Vì đa số comic là tiếng Việt và còn có Manhua, Manhwa) => Kiểm tra trước khi dùng.
-   Nếu bạn dùng MongoDB thì nhớ đánh index cho các field thường xuyên find. => Tăng tốc độ truy vấn.
-   Các link ảnh trong cơ sở dữ liệu có thể không hiển thị trực tiếp được vì có thể bị 403 cloudflare => Dùng 1 proxy trung gian để stream hoặc buffer nguồn ảnh: [Proxy](https://github.com/leephan2k1/simple-proxy/blob/main/index.js), nếu cần các interceptor xịn hơn có thể tham khảo [HoangVu Request Proxy](https://github.com/hoangvu12/requests-proxy)
-   Cuối cùng, xin được phép **ăn xin**, nếu bạn có lòng hảo tâm có thể đồ nây mình thông qua:

1. Sacombank: 070109823242 (PHAN THANH TRIẾT LÝ)
2. MOMO:

    ![momo](https://i.ibb.co/g9KWyK3/1fc0f64ec9190d475408.jpg)

# Happy coding!

![fun-doge](https://i.ibb.co/9rTSpLM/21f58444ba137e4d2702.jpg)

[Quay về mục lục 🔼](https://github.com/leephan2k1/manga-app/blob/main/Database.Vi.md#hướng-dẫn-setup-comic-database)
