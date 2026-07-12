import cls from './Aurora.module.css';

export default function Aurora() {
    return (
        <div className={cls.root} aria-hidden="true">
            <div className={`${cls.blob} ${cls.blob1}`} />
            <div className={`${cls.blob} ${cls.blob2}`} />
            <div className={`${cls.blob} ${cls.blob3}`} />
            <div className={`${cls.blob} ${cls.blob4}`} />
        </div>
    );
}
