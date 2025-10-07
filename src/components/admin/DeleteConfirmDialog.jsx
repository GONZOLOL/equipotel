'use client';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DeleteConfirmDialog = ({
    visible,
    onHide,
    onConfirm,
    product,
    productName,
    title = 'Confirmar Eliminación',
    message,
}) => {
    const displayName = productName || product?.name || 'este producto';
    const displayMessage =
        message ||
        `¿Estás seguro de que quieres eliminar ${displayName}? Esta acción no se puede deshacer.`;

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header={title}
            modal
            className="p-fluid"
            style={{ width: '30rem' }}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: '2rem' }}
                />
                <span>{displayMessage}</span>
            </div>
            <div className="flex justify-end gap-2 mt-6">
                <Button
                    label="Cancelar"
                    severity="secondary"
                    outlined
                    onClick={onHide}
                />
                <Button
                    label="Eliminar"
                    severity="danger"
                    onClick={onConfirm}
                />
            </div>
        </Dialog>
    );
};

export default DeleteConfirmDialog;
