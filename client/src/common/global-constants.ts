import { Characteristic } from "src/app/characteristic";

export class GlobalConstants {

    public static mainColor : string = '#ffffff';
    public static sizeIcon : string = 'https://cdn2.iconfinder.com/data/icons/boxicons-regular-vol-1/24/bx-area-256.png';
    public static heightIcon : string = 'https://cdn2.iconfinder.com/data/icons/picol-vector/32/size_height-256.png';
    public static bathIcon : string = 'https://cdn3.iconfinder.com/data/icons/solid-amenities-icon-set/64/Towel_2-256.png';
    public static bethIcon : string = 'https://cdn3.iconfinder.com/data/icons/furniture-4-4/512/furniture_living_room_home_house_offie-09-256.png';
    public static chiqIcon : string = 'https://cdn4.iconfinder.com/data/icons/food-and-equipment-outline/32/spoon_holder-256.png';
    public static extIcon : string = '';


    public static cabaniaImg: string [] = [
        'https://i.ibb.co/W6FGGVq/Caba-a1.jpg',
        'https://tallerdensamble.com/wp-content/uploads/2019/06/Inicio6.jpg',
        'https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1467151077/p/photo/image/1564280/prefabricdas-madera.jpg'
    ];
    public static containerImg: string [] = [
        'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/03/04125709/Casa-Container-5.jpg',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cargohome-exterior-4-1588755422.jpg'
    ];
    public static cupulaImg: string [] = [
        'https://ovacen.com/wp-content/uploads/2016/10/casa-domo.jpg',
        'https://arquitectura-sostenible.es/wp-content/uploads/2018/04/CUPULA-22-840x442.jpg'
    ];

    public static cabaniaCharacteristics : Characteristic[] = [
        new Characteristic('Dimensiones', 'Las cabañas que se manejan tienen una dimensión de 7x7 m²', this.sizeIcon),
        new Characteristic('Altura', 'Para la parte mas alta de las cabañas de maneja un tamaño de 3 m de altura', this.heightIcon),
        new Characteristic('Baños', 'Las cabañas cuentan con un baño de 3x2 m²."', this.bathIcon),
        new Characteristic('Habitaciones', 'Las cabañas basicas cuentan con 1 habitación de 5x3 m².', this.bethIcon),
        new Characteristic('Cocina', 'Las cabañas cuentan con una cocina de 3x2 m².', this.chiqIcon ),
        new Characteristic('Otros', 'Las cabañas cuentan con un...', this.extIcon),
    ]
}